import React, { useState } from 'react'

type SetIDs = React.Dispatch<React.SetStateAction<string[]>>

const moveTrackUp = (id: string, setTrackOrder: SetIDs) => {
  setTrackOrder(t => {
    const idx = t.findIndex(t => t === id)
    if (idx > 0) {
      const el = t[idx]
      t[idx] = t[idx - 1]
      t[idx - 1] = el
    }
    return t
  })
}

const moveTrackDown = (id: string, setTrackOrder: SetIDs) => {
  setTrackOrder(t => {
    const idx = t.findIndex(t => t === id)
    if (idx !== -1 && idx < t.length - 1) {
      const el = t[idx]
      t[idx] = t[idx + 1]
      t[idx + 1] = el
    }
    return t
  })
}

const setTrackOrderIDs = (ids: string[], setTrackOrder: SetIDs) => {
  setTrackOrder(cur => {
    // ids is the full list of tracks to end up with.
    // If a track is removed, remove it.
    // If a track is found in the current state, leave it where it is.
    // If a new track is added, add it to the end.
    const existingTracks = cur.filter(t => ids.includes(t))
    const newTracks = ids.filter(n => !cur.includes(n))
    return [...existingTracks, ...newTracks]
  })
}

const useTrackOrder = (tracks?: string[]) => {
  const [trackOrder, setTrackOrder] = useState<string[]>(tracks || [])
  return {
    trackOrder: trackOrder,
    moveTrackUp: (id) => moveTrackUp(id, setTrackOrder),
    moveTrackDown: (id) => moveTrackDown(id, setTrackOrder),
    setTrackOrderIDs: (ids: string[]) => setTrackOrderIDs(ids, setTrackOrder),
  }
}

export default useTrackOrder
