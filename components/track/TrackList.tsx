import { getTrackColor, Track } from 'lib/types/tracks'
import styles from 'styles/components/track/TrackList.module.scss'
import CheckIcon from 'icons/check-square.svg'
import Repeat from 'icons/repeat.svg'


type TrackListProps = {
  tracks: Track[]
  highlightTrack: (number) => void
  unhighlightTrack: (number) => void
  selected: number[]
  selectTrack: (number) => void
  unselectTrack: (number) => void
  reversed: number[]
  reverseTrack: (number) => void
  unreverseTrack: (number) => void
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
}: TrackListProps) => {
  const changeSelection = (e, t) => {
    if (e.target.checked) {
      selectTrack(t.indexInFile)
    } else {
      unselectTrack(t.indexInFile)
    }
  }

  const changeReversed = (e, t) => {
    if (e.target.checked) {
      reverseTrack(t.indexInFile)
    } else {
      unreverseTrack(t.indexInFile)
    }
  }

  return <div className={styles.wrapper}>
    <h2>Tracks</h2>
    <div className={styles.headerRow}>
      <CheckIcon height="12px" width="12px" viewBox="0 0 24 24" />
      <Repeat height="12px" width="12px" viewBox="0 0 24 24" />
    </div>
    <div className={styles.scrollArea}>
      <ul className={styles.list}>
        {tracks.map((t, i) => {
          return <li className={styles.item} key={i} onMouseOver={() => highlightTrack(t.indexInFile)} onMouseOut={() => unhighlightTrack(t.indexInFile)}>
            <input className={styles.checkbox} type="checkbox" checked={selected.includes(t.indexInFile)} onChange={e => changeSelection(e, t)} />
            <input className={styles.checkbox} type="checkbox" checked={reversed.includes(t.indexInFile)} onChange={e => changeReversed(e, t)} />
            <i className={styles.keyPip} style={{ backgroundColor: getTrackColor(i) }} />
            {t.name}
          </li>
        })}
      </ul>
    </div>
  </div>
}

export default TrackList
