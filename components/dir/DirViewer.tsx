import { cn } from 'lib/styles'
import styles from 'styles/components/dir/DirViewer.module.scss'
import Dir from './Dir'
import File from './File'
import path from 'path'
import React from 'react'

type DirItem = {
  name: string
  type: 'file' | 'dir'
}

type Dir = {
  path: string
  items: DirItem[]
}

type DirViewerProps = {
  dir?: Dir
  selected: string[]
  setSelected: (filepath: string, append?: boolean) => void
}

const DirViewer = ({ dir, selected, setSelected }: DirViewerProps) => {
  if (dir === undefined || dir.items === undefined) {
    return <div></div>
  }
  const filepath = dir.path

  return <div className={styles.wrapper}>
    <li className={styles.title}>{filepath}</li>
    <ul className={styles.fileList}>
      {dir.items.map(f => {
        if (f.type === 'dir') return <Dir
          key={f.name}
          filepath={path.join(filepath, f.name)}
          name={f.name}
          selected={selected}
          setSelected={setSelected}
        />
        return <File
          key={f.name}
          name={f.name}
          selected={selected.includes(path.join(filepath, f.name))}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            let append = false
            if (e.metaKey || e.ctrlKey) {
              append = true
            }
            setSelected(path.join(filepath, f.name), append)
          }}
          className={styles.fileItem}
        />
      })}
    </ul>
  </div>
}

export default DirViewer
