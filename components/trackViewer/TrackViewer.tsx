import { useState } from 'react'

import useLeafletMap from 'hooks/useLeafletMap'
import useGPXFile from 'hooks/useGPXFile'

import TrackList from './TrackList'

import styles from 'styles/components/trackViewer/TrackViewer.module.scss'

const highlightTrack = (name, setHighlightedTracks) => {
  setHighlightedTracks(t => {
    if (!t.includes(name)) {
      return [...t, name]
    }
    return t
  })
}

const unhighlightTrack = (name, setHighlightedTracks) => {
  setHighlightedTracks(t => {
    if (t.includes(name)) {
      return t.filter(n => n !== name)
    }
    return t
  })
}

const TrackViewer = ({ path }) => {
  const LeafletMap = useLeafletMap()
  const gpx = useGPXFile(path)

  const [highlightedTracks, setHighlightedTracks] = useState([])

  if (path === undefined) return <div>No file selected.</div>
  if (gpx.error) {
    return <div>Error loading track</div>
  }
  if (gpx.data === undefined) {
    return <div>Loading track...</div>
  }
  return <div className={styles.wrapper}>
    <LeafletMap tracks={gpx.data} highlightedTracks={highlightedTracks} />
    <TrackList
      tracks={gpx.data}
      highlightTrack={(name: string) => highlightTrack(name, setHighlightedTracks)}
      unhighlightTrack={(name: string) => unhighlightTrack(name, setHighlightedTracks)}
    />
  </div>
}

export default TrackViewer

