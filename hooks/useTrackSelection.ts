import { useState } from 'react'

const selectTrack = (id, setSelectedTracks) => {
  setSelectedTracks(t => {
    if (!t.includes(id)) {
      return [...t, id]
    }
    return t
  })
}

const unselectTrack = (id, setSelectedTracks) => {
  setSelectedTracks(t => {
    if (t.includes(id)) {
      return t.filter(n => n !== id)
    }
    return t
  })
}

const useTrackSelection = (tracks) => {
  const [selectedTracks, setSelectedTracks] = useState(tracks || [])
  return {
    selected: selectedTracks,
    selectTrack: (id) => selectTrack(id, setSelectedTracks),
    unselectTrack: (id) => unselectTrack(id, setSelectedTracks),
    initTracks: (trackIndexes) => setSelectedTracks(trackIndexes),
  }
}

export default useTrackSelection
