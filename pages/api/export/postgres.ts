import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: '400 (Method not allowed): Method not supported' })
    return
  }

  const {
    connection,
    id,
    name,
    description,
    overwrite,
    track
  } = req.body

  if (connection === undefined) {
    res.status(400).json({ error: '400 (Bad Request): Missing connection string (connection)' })
    return
  }
  if (id === undefined) {
    res.status(400).json({ error: '400 (Bad Request): Missing route ID (id)' })
    return
  }
  if (name === undefined) {
    res.status(400).json({ error: '400 (Bad Request): Missing route name (name)' })
    return
  }
  if (track === undefined) {
    res.status(400).json({ error: '400 (Bad Request): Missing track' })
    return
  }

  try {
    const client = new Client({
      connectionString: connection,
    })
    client.connect()

    let query = `INSERT INTO routes (id, display_name, description, track) VALUES ($1, $2, $3, $4)`
    const values = [id, name, description, track]
    if (overwrite) {
      query += ` ON CONFLICT (id) DO UPDATE SET display_name = $2, description = $3, track = $4`
    }

    await client.query(query, values)

    res.status(200).json({})
  } catch (e) {
    res.status(500).json({ error: '500 (Internal Server Error): ' + e.message })
    return
  }
}
