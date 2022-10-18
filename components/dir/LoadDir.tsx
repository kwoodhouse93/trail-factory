import styles from 'styles/components/dir/LoadDir.module.scss'

const LoadDir = ({ path, setPath, onLoad, className }) => {
  return <p className={className}>
    <input className={styles.input} type="text" value={path} onChange={e => setPath(e.target.value)} />
    <button className={styles.button} onClick={onLoad}>Import</button>
  </p>
}

export default LoadDir
