import { useState } from 'react'

const selectTrack = (indexInFile, setSelectedTracks) => {
  setSelectedTracks(t => {
    if (!t.includes(indexInFile)) {
      return [...t, indexInFile]
    }
    return t
  })
}

const unselectTrack = (indexInFile, setSelectedTracks) => {
  setSelectedTracks(t => {
    if (t.includes(indexInFile)) {
      return t.filter(n => n !== indexInFile)
    }
    return t
  })
}

const useTrackSelection = (tracks) => {
  const [selectedTracks, setSelectedTracks] = useState(tracks || [])
  return {
    selected: selectedTracks,
    selectTrack: (indexInFile) => selectTrack(indexInFile, setSelectedTracks),
    unselectTrack: (indexInFile) => unselectTrack(indexInFile, setSelectedTracks),
    initTracks: (trackIndexes) => setSelectedTracks(trackIndexes),
  }
}

export default useTrackSelection
