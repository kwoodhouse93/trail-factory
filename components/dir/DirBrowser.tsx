import { useEffect, useState } from 'react'

import DirViewer from './DirViewer'
import LoadDir from './LoadDir'

import styles from 'styles/components/dir/DirBrowser.module.scss'

const DirBrowser = ({ setFullPaths }) => {
  let defaultPath = '/'
  if (typeof window !== 'undefined') {
    defaultPath = localStorage.getItem('path') || '/'
  }
  const [filepath, setFilepath] = useState(defaultPath)
  const [dir, setDir] = useState(undefined)
  const [selected, setSelected] = useState([])

  useEffect(() => {
    getDir(filepath, d => setDir(d))
  }, [])

  return <div className={styles.wrapper}>
    <LoadDir
      className={styles.loader}
      path={filepath}
      setPath={setFilepath}
      onLoad={() => getDir(filepath, d => setDir(d), true)}
    />
    <DirViewer dir={dir} selected={selected} setSelected={(filepath, append) => {
      let fullPaths = []
      if (!append) {
        fullPaths = [filepath]
        setSelected(fullPaths)
      } else {
        setSelected(s => {
          if (s.includes(filepath)) {
            fullPaths = s.filter(f => f !== filepath)
          } else {
            fullPaths = [...s, filepath]
          }
          return fullPaths
        })
      }
      setFullPaths(fullPaths)
    }} />
  </div>
}

export default DirBrowser

export const getDir = async (path, cb, store?) => {
  if (typeof window !== 'undefined' && store === true) {
    localStorage.setItem('path', path)
  }

  fetch(`/api/dir?path=${path}`)
    .then(res => res.json())
    .then(data => {
      cb(data.dir)
    })
}
