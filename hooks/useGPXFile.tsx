import { parseGPX } from 'lib/geo/gpx'
import { useEffect, useState } from 'react'

const useGPXFile = (path) => {
  const [gpx, setGpx] = useState(undefined)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    if (path === undefined) return

    fetch(`/api/file?path=${path}`)
      .then(res => res.json())
      .then(data => parseGPX(Buffer.from(data.file).toString('utf8')))
      .then(data => {
        setGpx(data)
        setError(undefined)
      })
      .catch(err => {
        setError(err)
      })
  }, [path])

  if (path === undefined) return null

  return {
    data: gpx,
    error: error,
  }
}

export default useGPXFile
