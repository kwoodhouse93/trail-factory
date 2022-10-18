import * as gPolyline from 'google-polyline'
import { Map, Polyline as PolylineType } from 'leaflet'
import { useCallback, useRef } from 'react'
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type LeafletMapProps = {
  polyline?: string
  arrayLine?: { lat: number, lon: number }[]
}

const LeafletMap = ({ polyline, arrayLine }: LeafletMapProps) => {
  const mapRef = useRef<Map>(null)

  // Auto-set zoom based on polyline
  const fitRef = useCallback((polyline: PolylineType) => {
    if (polyline !== undefined && polyline !== null && mapRef.current !== null) {
      mapRef.current.fitBounds(polyline.getBounds())
    }
  }, [])


  let center = [51.509865, -0.118092]

  let polylineEl = null
  if (polyline !== undefined) {
    const points = gPolyline.decode(polyline)
    center = points.reduce((acc, p) => {
      acc[0] += p[0]
      acc[1] += p[1]
      return acc
    }, [0, 0])
    center[0] /= points.length
    center[1] /= points.length
    polylineEl = <Polyline ref={fitRef} positions={points} />
  }

  let arrayLineEl = null
  if (arrayLine !== undefined) {
    const points: [number, number][] = arrayLine.map(p => [p.lat, p.lon])
    if (polylineEl === null) {
      center = points.reduce((acc, p) => {
        acc[0] += p[0]
        acc[1] += p[1]
        return acc
      }, [0, 0])
      center[0] /= points.length
      center[1] /= points.length
    }
    arrayLineEl = <Polyline ref={fitRef} positions={points} />
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
      {arrayLineEl}
    </MapContainer>
  )
}

export default LeafletMap
