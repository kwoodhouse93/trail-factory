import { getTrackColor, Track } from 'lib/types/tracks'
import styles from 'styles/components/track/TrackList.module.scss'
import CheckIcon from 'icons/check-square.svg'
import Repeat from 'icons/repeat.svg'


type TrackListProps = {
  tracks: Track[]
  highlightTrack: (string) => void
  unhighlightTrack: (string) => void
  selected: string[]
  selectTrack: (string) => void
  unselectTrack: (string) => void
  reversed: string[]
  reverseTrack: (string) => void
  unreverseTrack: (string) => void
  trackOrder: string[]
  moveTrackUp: (string) => void
  moveTrackDown: (string) => void
}

const TrackList = ({
  tracks,
  highlightTrack,
  unhighlightTrack,
  selected,
  selectTrack,
  unselectTrack,
  reversed,
  reverseTrack,
  unreverseTrack,
  trackOrder,
  moveTrackUp,
  moveTrackDown,
}: TrackListProps) => {
  const changeSelection = (e, t) => {
    if (e.target.checked) {
      selectTrack(t.id)
    } else {
      unselectTrack(t.id)
    }
  }

  const changeReversed = (e, t) => {
    if (e.target.checked) {
      reverseTrack(t.id)
    } else {
      unreverseTrack(t.id)
    }
  }

  if (tracks.length !== trackOrder.length) {
    return null
  }

  return <div className={styles.wrapper}>
    <h2>Tracks</h2>
    <div className={styles.headerRow}>
      <CheckIcon height="12px" width="12px" viewBox="0 0 24 24" />
      <Repeat height="12px" width="12px" viewBox="0 0 24 24" />
    </div>
    <div className={styles.scrollArea}>
      <ul className={styles.list}>
        {trackOrder.map((id, i) => {
          const t = tracks.find(t => t.id === id)
          return <li className={styles.item} key={t.id} onMouseOver={() => highlightTrack(t.id)} onMouseOut={() => unhighlightTrack(t.id)}>
            <input className={styles.checkbox} type="checkbox" checked={selected.includes(t.id)} onChange={e => changeSelection(e, t)} />
            <input className={styles.checkbox} type="checkbox" checked={reversed.includes(t.id)} onChange={e => changeReversed(e, t)} />
            <i className={styles.keyPip} style={{ backgroundColor: getTrackColor(i) }} />
            <span className={styles.name}>{t.name}</span>
            <button className={styles.moveButton} onClick={() => moveTrackUp(t.id)}>▲</button>
            <button className={styles.moveButton} onClick={() => moveTrackDown(t.id)}>▼</button>
          </li>
        })}
      </ul>
    </div>
  </div>
}

export default TrackList
