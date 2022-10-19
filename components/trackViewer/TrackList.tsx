import { getTrackColor, Track } from 'lib/types/tracks'
import styles from 'styles/components/trackViewer/TrackList.module.scss'

type TrackListProps = {
  tracks: Track[]
  highlightTrack: (number) => void
  unhighlightTrack: (number) => void
  selected: number[]
  selectTrack: (number) => void
  unselectTrack: (number) => void
}


const TrackList = ({ tracks, highlightTrack, unhighlightTrack, selected, selectTrack, unselectTrack }: TrackListProps) => {
  const changeSelection = (e, t) => {
    if (e.target.checked) {
      selectTrack(t.indexInFile)
    } else {
      unselectTrack(t.indexInFile)
    }
  }

  return <div className={styles.wrapper}>
    <h2>Tracks</h2>
    <ul className={styles.list}>
      {tracks.map((t, i) => {
        return <li className={styles.item} key={i} onMouseOver={() => highlightTrack(t.indexInFile)} onMouseOut={() => unhighlightTrack(t.indexInFile)}>
          <input className={styles.checkbox} type="checkbox" checked={selected.includes(t.indexInFile)} onChange={e => changeSelection(e, t)} />
          <i className={styles.keyPip} style={{ backgroundColor: getTrackColor(i) }} />
          {t.name}
        </li>
      })}
    </ul>
  </div>
}

export default TrackList
