// api/proxy.js
export default async function handler(req, res) {
    const { endpoint } = req.query;
    
    if (!endpoint) {
        return res.status(400).json({ error: 'Endpoint parameter is required' });
    }

    try {
        // Fetch data from FPL API
        // We add a User-Agent because FPL sometimes blocks generic requests
        const response = await fetch(`https://fantasy.premierleague.com/api${endpoint}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`FPL API responded with ${response.status}`);
        }

        const data = await response.json();
        
        // Return data to your frontend
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
