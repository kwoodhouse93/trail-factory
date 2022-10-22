import { toGeoJSON } from 'lib/geo/geojson'
import { useEffect } from 'react'
import { useState } from 'react'
import { buildPoints } from './PostgresExporter'
import simplify from 'simplify-geojson'

import styles from 'styles/components/export/PostgresExporter.module.scss'

const ExportImage = ({ gpx, selected, reversed, trackOrder, image, setImage }) => {
  const [threshold, setThreshold] = useState(1)
  const [imageURL, setImageURL] = useState(image !== undefined ? URL.createObjectURL(image) : undefined)

  const generate = () => {
    if (gpx === undefined) return
    mapboxImage(buildPoints(gpx, selected, reversed, trackOrder), threshold)
      .then(i => i.blob())
      .then(i => {
        const url = URL.createObjectURL(i)
        setImage(i)
        setImageURL(url)
      })
  }

  return <>
    <div className={styles.formRow}>
      <button onClick={() => generate()}>
        Generate image
      </button>
      <input type="number" value={threshold} onChange={e => setThreshold(parseFloat(e.target.value))} />
    </div>
    {image && <img src={imageURL} />}
  </>
}

export default ExportImage

const mapboxImage = (points: { lat: number, lon: number }[], threshmulti) => {
  let geoJSON = toGeoJSON(points)

  // This is some real wishy-washy magic number stuff.
  // The aim is to get an accurate route thumbnial from mapbox.
  // Too many points and mapbox kicks off.
  // Too few and the route track starts looking very low res.
  // The assumption that threshold should vary by number of points
  // is weak. Resolution matters as does actual route complexity.
  // This gets us somewhere though.
  //
  // TODO: Possibly look into making this a tunable parameter
  // for each route
  const threshold = points.length / (1000000 * threshmulti)
  // console.log(points.length, ' points, threshold: ', threshold)
  geoJSON = simplify(geoJSON, threshold)
  // console.log(geoJSON)
  return fetch('/api/mapbox/static', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      geojson: geoJSON,
    }),
  })
}
