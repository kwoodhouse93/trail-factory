import * as fs from 'fs'
export default function handler(req, res) {
  if (req.query.path === undefined) {
    res.status(400).json({ error: "No path specified" })
    return
  }
  const path = req.query.path
  const dir = fs.readdirSync(path)
  res.status(200).json({ dir })
}
