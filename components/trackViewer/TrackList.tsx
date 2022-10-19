import { getTrackColor, Track } from 'lib/types/tracks'
import styles from 'styles/components/trackViewer/TrackList.module.scss'

type TrackListProps = {
  tracks: Track[]
  highlightTrack: (string) => void
  unhighlightTrack: (string) => void
}

const TrackList = ({ tracks, highlightTrack, unhighlightTrack }: TrackListProps) => {
  return <div className={styles.wrapper}>
    <h2>Tracks</h2>
    <ul className={styles.list}>
      {tracks.map((t, i) => {
        return <li className={styles.item} key={i} onMouseOver={() => highlightTrack(t.name)} onMouseOut={() => unhighlightTrack(t.name)}>
          <input className={styles.checkbox} type="checkbox" />
          <i className={styles.keyPip} style={{ backgroundColor: getTrackColor(i) }} />
          {t.name}
        </li>
      })}
    </ul>
  </div>
}

export default TrackList
