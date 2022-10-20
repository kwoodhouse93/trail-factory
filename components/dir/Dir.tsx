import { cn } from 'lib/styles'
import { useEffect, useState } from 'react'
import styles from 'styles/components/dir/DirViewer.module.scss'
import { getDir } from './DirBrowser'
import File from './File'
import path from 'path'

const Dir = ({ filepath, name, selected, setSelected }) => {
  const [open, setOpen] = useState(false)
  const [dir, setDir] = useState(undefined)

  useEffect(() => {
    getDir(filepath, d => setDir(d))
  }, [name, setDir])

  return <div className={styles.wrapper}>
    <li
      className={cn(styles.title)}
      onClick={() => setOpen(o => !o)}
    >{name}</li>
    {open === true &&
      <ul className={styles.fileList}>
        {dir.items.map(f => {
          if (f.type === 'dir') {
            return <Dir
              key={f.name}
              filepath={path.join(filepath, f.name)}
              name={f.name}
              selected={selected}
              setSelected={setSelected}
            />
          }
          return <File
            key={f.name}
            name={f.name}
            selected={path.join(filepath, f.name) === selected}
            onClick={() => setSelected(path.join(filepath, f.name))}
            className={styles.fileItem}
          />
        })}
      </ul>}
  </div>
}

export default Dir
