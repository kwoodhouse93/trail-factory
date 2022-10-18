import styles from 'styles/components/dir/DirViewer.module.scss'
import File from './File'

const DirViewer = ({ dir, selected, setSelected }) => {
  if (!dir) {
    return <div></div>
  }

  return <div className={styles.wrapper}>
    <h2>{dir.path}</h2>
    <ul className={styles.fileList}>
      {dir.map(f => <File key={f} name={f} selected={f === selected} onClick={() => setSelected(f)} className={styles.fileItem} />)}
    </ul>
  </div>
}

export default DirViewer
