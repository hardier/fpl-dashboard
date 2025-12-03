// api/proxy.js
export default async function handler(req, res) {
    const { endpoint } = req.query;

    if (!endpoint) {
        return res.status(400).json({ error: 'Endpoint parameter is required' });
    }

    const targetUrl = `https://fantasy.premierleague.com/api${endpoint}`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Referer': 'https://fantasy.premierleague.com/'
            }
        });

        if (!response.ok) throw new Error(`FPL API Status: ${response.status}`);

        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
}