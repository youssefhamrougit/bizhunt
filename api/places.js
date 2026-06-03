// api/places.js
// Vercel serverless function — proxies Google Places API calls.
// The API key lives in process.env and is NEVER sent to the browser.

const GMAPS_KEY = process.env.GOOGLE_MAPS_API_KEY;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (!GMAPS_KEY) {
    return res.status(500).json({ error: "GOOGLE_MAPS_API_KEY not configured on server." });
  }

  const { action, query, place_id, pagetoken } = req.query;

  try {
    let url;

    if (action === "textsearch") {
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GMAPS_KEY}`;
      if (pagetoken) url += `&pagetoken=${encodeURIComponent(pagetoken)}`;
    } else if (action === "details") {
      url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(place_id)}&fields=name,types,rating,user_ratings_total,website,url,formatted_address&key=${GMAPS_KEY}`;
    } else {
      return res.status(400).json({ error: "Invalid action. Use 'textsearch' or 'details'." });
    }

    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
