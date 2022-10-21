import useLeafletMap from 'hooks/useLeafletMap'

import styles from 'styles/components/track/TrackViewer.module.scss'

const TrackViewer = ({ gpx, highlighted, selected, reversed }) => {
  const LeafletMap = useLeafletMap()

  if (gpx === null) return <div>No file selected.</div>
  if (gpx.error) {
    return <div>
      <p>
        Error loading track:
      </p>
      <p>
        {gpx.error.message}
      </p>
    </div>
  }
  if (gpx.data === undefined) {
    return <div>Loading track...</div>
  }
  return <div className={styles.wrapper}>
    <LeafletMap tracks={gpx.data.flat()} highlightedTracks={highlighted} selectedTracks={selected} reversedTracks={reversed} />
  </div>
}

export default TrackViewer

