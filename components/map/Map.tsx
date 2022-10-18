import * as gPolyline from 'google-polyline'
import { Map, Polyline as PolylineType } from 'leaflet'
import { useCallback, useRef } from 'react'
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type MapProps = {
  polyline?: string
}

const Map = ({ polyline }: MapProps) => {
  const mapRef = useRef<Map>(null)

  // Auto-set zoom based on polyline
  const fitRef = useCallback((polyline: PolylineType) => {
    if (polyline !== undefined && polyline !== null && mapRef.current !== null) {
      mapRef.current.fitBounds(polyline.getBounds())
    }
  }, [])

  let polylineEl = null
  let center = [51.509865, -0.118092]
  if (polyline !== undefined) {
    const points = gPolyline.decode(polyline)
    const center = points.reduce((acc, p) => {
      acc[0] += p[0]
      acc[1] += p[1]
      return acc
    }, [0, 0])
    center[0] /= points.length
    center[1] /= points.length

    polylineEl = <Polyline ref={fitRef} positions={points} />
  }

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={9}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {polylineEl}
    </MapContainer>
  )
}

export default Map
