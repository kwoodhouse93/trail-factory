import path from 'path'
import { useEffect, useState } from 'react'

import DirViewer from './DirViewer'
import LoadDir from './LoadDir'

import styles from 'styles/components/dir/DirBrowser.module.scss'

const DirBrowser = ({ setFullPath }) => {
  let defaultPath = '/'
  if (typeof window !== 'undefined') {
    defaultPath = localStorage.getItem('path') || '/'
  }
  const [filepath, setFilepath] = useState(defaultPath)
  const [dir, setDir] = useState(undefined)
  const [selected, setSelected] = useState(undefined)

  useEffect(() => {
    getDir(filepath, d => setDir(d))
  }, [])

  return <div>
    <LoadDir className={styles.loader} path={filepath} setPath={setFilepath} onLoad={() => getDir(filepath, d => setDir(d))} />
    <DirViewer dir={dir} selected={selected} setSelected={s => {
      setSelected(s)
      setFullPath(path.join(filepath, s))
    }} />
  </div>
}

export default DirBrowser


const getDir = async (path, cb) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('path', path)
  }

  fetch(`/api/dir?path=${path}`)
    .then(res => res.json())
    .then(data => {
      cb(data.dir)
    })
}
