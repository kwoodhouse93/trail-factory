import { FeatureGroup as FeatureGroupType, Map } from 'leaflet'
import { useCallback, useRef } from 'react'
import { FeatureGroup, MapContainer, Pane, Polyline, Rectangle, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { getTrackColor, Track } from 'lib/types/tracks'

export type LeafletMapProps = {
  tracks?: Track[]
  highlightedTracks?: string[]
}

const LeafletMap = ({ tracks, highlightedTracks }: LeafletMapProps) => {
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
  if (tracks !== undefined) {
    tracks.map((t, i) => {
      const points: [number, number][] = t.points.map(p => [p.lat, p.lon])
      trackEls.push(<Polyline key={i} positions={points} color={getTrackColor(i)} />)

      if (highlightedTracks !== undefined && highlightedTracks.includes(t.name)) {
        highlightEls.push(<Polyline key={i} positions={points} color='white' weight={8} />)
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
    </MapContainer>
  )
}

export default LeafletMap
