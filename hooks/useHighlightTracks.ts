import { useState } from 'react'

const highlightTrack = (id, setHighlightedTracks) => {
  setHighlightedTracks(t => {
    if (!t.includes(id)) {
      return [...t, id]
    }
    return t
  })
}

const unhighlightTrack = (id, setHighlightedTracks) => {
  setHighlightedTracks(t => {
    if (t.includes(id)) {
      return t.filter(n => n !== id)
    }
    return t
  })
}

const useHighlightTracks = () => {
  const [highlightedTracks, setHighlightedTracks] = useState([])
  return {
    highlighted: highlightedTracks,
    highlightTrack: (id) => highlightTrack(id, setHighlightedTracks),
    unhighlightTrack: (id) => unhighlightTrack(id, setHighlightedTracks),
  }
}

export default useHighlightTracks
