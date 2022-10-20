import * as fs from 'fs'
import * as path from 'path'

export default async function handler(req, res) {
  if (req.query.path === undefined) {
    res.status(400).json({ error: "No path specified" })
    return
  }
  const filepath = req.query.path
  const fsDir = await fs.promises.readdir(filepath)
  const dir = {
    path: filepath,
    items: await Promise.all(fsDir
      .filter(f => !f.startsWith('.'))
      .map(async f => {
        const stat = await fs.promises.stat(path.join(filepath, f))
        return {
          name: f,
          type: stat.isDirectory() ? 'dir' : 'file',
        }
      })
    )
  }
  res.status(200).json({ dir })
}
