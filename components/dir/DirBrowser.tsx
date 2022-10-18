import { useEffect, useState } from 'react'
import DirViewer from './DirViewer'
import LoadDir from './LoadDir'

const DirBrowser = () => {
  let defaultPath = '/'
  if (typeof window !== 'undefined') {
    defaultPath = localStorage.getItem('path') || '/'
  }
  const [path, setPath] = useState(defaultPath)
  const [dir, setDir] = useState(undefined)

  useEffect(() => {
    getDir(path, d => setDir(d))
  }, [])

  return <div>
    <LoadDir path={path} setPath={setPath} onLoad={() => getDir(path, d => setDir(d))} />
    <DirViewer dir={dir} />
  </div>
}

export default DirBrowser


const getDir = async (path, cb) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('path', path)
  }

  fetch(`/api/files?path=${path}`)
    .then(res => res.json())
    .then(data => {
      cb(data.dir)
    })
}
