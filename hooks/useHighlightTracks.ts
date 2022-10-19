import { useState } from 'react'

const highlightTrack = (indexInFile, setHighlightedTracks) => {
  setHighlightedTracks(t => {
    if (!t.includes(indexInFile)) {
      return [...t, indexInFile]
    }
    return t
  })
}

const unhighlightTrack = (indexInFile, setHighlightedTracks) => {
  setHighlightedTracks(t => {
    if (t.includes(indexInFile)) {
      return t.filter(n => n !== indexInFile)
    }
    return t
  })
}

const useHighlightTracks = () => {
  const [highlightedTracks, setHighlightedTracks] = useState([])
  return {
    highlighted: highlightedTracks,
    highlightTrack: (indexInFile) => highlightTrack(indexInFile, setHighlightedTracks),
    unhighlightTrack: (indexInFile) => unhighlightTrack(indexInFile, setHighlightedTracks),
  }
}

export default useHighlightTracks
