import { parseGPX } from 'lib/geo/gpx'
import { useEffect, useState } from 'react'

const useGPXFiles = (paths) => {
  const [gpxs, setGpxs] = useState(undefined)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    if (paths === undefined) return
    setGpxs([])
    setError(undefined)
    paths.forEach(path => {
      fetch(`/api/file?path=${path}`)
        .then(res => res.json())
        .then(data => parseGPX(Buffer.from(data.file).toString('utf8')))
        .then(data => {
          setGpxs(g => [...g, data])
        })
        .catch(err => {
          setError(err)
        })
    })
  }, [paths])

  if (paths === undefined) return null

  return {
    data: gpxs,
    error: error,
  }
}

export default useGPXFiles
