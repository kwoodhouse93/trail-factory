import { parseGPX } from 'lib/geo/gpx'
import { useEffect, useState } from 'react'

const useGPXFiles = (paths, setNewTracks) => {
  const [gpxs, setGpxs] = useState(undefined)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    if (paths === undefined) return
    setError(undefined)

    Promise.all(paths.map(path => fetch(`/api/file?path=${path}`)
      .then(res => res.json())
      .then(data => parseGPX(path, Buffer.from(data.file).toString('utf8')))
      .catch(err => {
        setError(err)
      })
    ))
      .then(data => {
        let newTracks = []
        if (gpxs === undefined) {
          newTracks = data.flat().map(t => t.id)
        } else {
          const existingIDs = gpxs.flat().map(t => t.id)
          newTracks = data.flat().filter(t => !existingIDs.includes(t.id)).map(t => t.id)
        }
        setNewTracks(newTracks)
        setGpxs(data)
      })
  }, [paths])

  if (paths === undefined) return null

  return {
    data: gpxs,
    error: error,
  }
}

export default useGPXFiles
