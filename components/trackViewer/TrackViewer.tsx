import useLeafletMap from 'hooks/useLeafletMap'
import useGPXFile from 'hooks/useGPXFile'

const TrackViewer = ({ path }) => {
  const LeafletMap = useLeafletMap()
  const gpx = useGPXFile(path)

  if (path === undefined) return <div>No file selected.</div>
  if (gpx.error) {
    return <div>Error loading track</div>
  }
  if (gpx.data === undefined) {
    return <div>Loading track...</div>
  }
  return <LeafletMap arrayLine={gpx.data} />
}

export default TrackViewer
