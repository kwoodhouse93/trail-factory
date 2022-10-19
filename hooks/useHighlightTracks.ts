import { useState } from 'react'

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

const useHighlightTracks = () => {
  const [highlightedTracks, setHighlightedTracks] = useState([])
  return {
    highlighted: highlightedTracks,
    highlightTrack: (name) => highlightTrack(name, setHighlightedTracks),
    unhighlightTrack: (name) => unhighlightTrack(name, setHighlightedTracks),
  }
}

export default useHighlightTracks
