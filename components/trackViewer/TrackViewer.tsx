import { useState } from 'react'

import useLeafletMap from 'hooks/useLeafletMap'

import TrackList from './TrackList'

import styles from 'styles/components/trackViewer/TrackViewer.module.scss'

const TrackViewer = ({ gpx, highlighted }) => {
  const LeafletMap = useLeafletMap()

  if (gpx === null) return <div>No file selected.</div>
  if (gpx.error) {
    return <div>Error loading track</div>
  }
  if (gpx.data === undefined) {
    return <div>Loading track...</div>
  }
  return <div className={styles.wrapper}>
    <LeafletMap tracks={gpx.data} highlightedTracks={highlighted} />
  </div>
}

export default TrackViewer

