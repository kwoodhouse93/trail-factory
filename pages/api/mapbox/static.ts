import { NextApiRequest, NextApiResponse } from 'next'

const token = process.env.MAPBOX_ACCESS_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: '400 (Method not allowed): Method not supported' })
    return
  }

  const {
    geojson
  } = req.body

  if (geojson === undefined) {
    res.status(400).json({ error: '400 (Bad Request): Missing geojson' })
    return
  }

  try {
    const reqURL = 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/geojson(' +
      encodeURIComponent(JSON.stringify(geojson)) +
      ')/auto/400x300@2x?padding=75,50,75,50&access_token=' +
      token

    const mapboxResponse = await fetch(reqURL)

    res
      .setHeader('Content-Type', 'image/png')
      .status(200)
      .send(mapboxResponse.body)
    return
  } catch (e) {
    res.status(500).json({ error: '500 (Internal Server Error): ' + e.message })
    return
  }
}
