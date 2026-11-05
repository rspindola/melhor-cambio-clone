/**
 * Vercel Serverless Function: /api/lead
 * Endpoint para recebimento e validação de leads (Casas Parceiras e Viajantes)
 */

module.exports = async (req, res) => {
  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido. Use POST.' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Proteção contra spam (Honeypot)
    if (data.website || data._gotcha) {
      console.warn('[SPAM BLOCKED] Honeypot preenchido:', data.website || data._gotcha);
      return res.status(200).json({ success: true, message: 'Processado com sucesso' });
    }

    const leadType = data.type || (data.corporateName ? 'partner' : 'traveler');

    if (leadType === 'partner') {
      if (!data.corporateName || !data.cnpj || !data.whatsappDesk) {
        return res.status(400).json({
          success: false,
          error: 'Campos obrigatórios ausentes: corporateName, cnpj ou whatsappDesk'
        });
      }
    } else if (leadType === 'traveler') {
      if (!data.name || !data.whatsapp || !data.currency) {
        return res.status(400).json({
          success: false,
          error: 'Campos obrigatórios ausentes: name, whatsapp ou currency'
        });
      }
    }

    // Se houver um Webhook externo configurado no ambiente Vercel (Formspree, Discord, Telegram, Zapier, Google Sheets)
    const externalWebhook = process.env.EXTERNAL_WEBHOOK_URL || process.env.FORMSPREE_URL;
    if (externalWebhook) {
      try {
        await fetch(externalWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (fwdErr) {
        console.error('[WEBHOOK FORWARD ERROR]', fwdErr);
      }
    }

    // Log estruturado no runtime Vercel para auditoria
    console.log(`[LEAD RECEIVED: ${leadType.toUpperCase()}]`, {
      identificador: data.corporateName || data.name,
      contato: data.whatsappDesk || data.whatsapp,
      origem: data.utms?.utm_source || 'direto',
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Inscrição registrada com sucesso na base Câmbio Direto.',
      leadType,
      receivedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('[API LEAD HANDLER ERROR]', err);
    return res.status(500).json({ success: false, error: 'Erro interno ao processar inscrição' });
  }
};
