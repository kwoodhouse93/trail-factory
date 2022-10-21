import L, { FeatureGroup as FeatureGroupType, Map } from 'leaflet'
import { useCallback, useRef } from 'react'
import { FeatureGroup, MapContainer, Marker, Pane, Polyline, TileLayer } from 'react-leaflet'
import { getTrackColor, Track } from 'lib/types/tracks'
import 'leaflet/dist/leaflet.css'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

export type LeafletMapProps = {
  tracks?: Track[]
  highlightedTracks?: string[]
  selectedTracks?: string[]
  reversedTracks?: string[]
}

const LeafletMap = ({ tracks, highlightedTracks, selectedTracks, reversedTracks }: LeafletMapProps) => {
  const mapRef = useRef<Map>(null)

  // Auto-set zoom based on polyline
  const fitRef = useCallback((toFit: FeatureGroupType) => {
    if (toFit !== undefined && toFit !== null && mapRef.current !== null) {
      const bounds = toFit.getBounds()
      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds)
      } else {
        // Not sure why we seem to need this, there's probably a better way
        setTimeout(() => {
          mapRef.current.fitBounds(toFit.getBounds())
        }, 100)
      }
    }
  }, [])


  let center: [number, number] = [51.509865, -0.118092]

  const trackEls = []
  const highlightEls = []
  const startMarkers = []
  if (tracks !== undefined) {
    tracks.map((t, i) => {
      const points: [number, number][] = t.points.map(p => [p.lat, p.lon])
      if (selectedTracks.includes(t.id) || highlightedTracks.includes(t.id)) {
        trackEls.push(<Polyline key={i} positions={points} color={getTrackColor(i)} />)
      }
      if (highlightedTracks !== undefined && highlightedTracks.includes(t.id)) {
        highlightEls.push(<Polyline key={i} positions={points} color='white' weight={8} />)

        let start = t.points[0]
        if (reversedTracks !== undefined && reversedTracks.includes(t.id)) {
          start = t.points[t.points.length - 1]
        }
        startMarkers.push(<Marker position={[start.lat, start.lon]} />)
      }
    })
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
      <Pane name='highlightPane' className='leaflet-overlay-pane' style={{ zIndex: 300 }}>
        {highlightEls.length > 0 && <FeatureGroup>
          {highlightEls}
        </FeatureGroup>}
      </Pane>
      {trackEls.length > 0 && <FeatureGroup ref={fitRef}>
        {trackEls}
      </FeatureGroup>}
      {startMarkers}
    </MapContainer>
  )
}

export default LeafletMap
