export const toGeoJSON = (track) => {
  return pointsToGeoJSON(track)
}

const pointsToGeoJSON = (points: { lat, lon }[]) => {
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: points.map(p => [
        Math.round(p.lon * 100000) / 100000,
        Math.round(p.lat * 100000) / 100000,
      ]),
    },
    properties: {
      stroke: '#fc4e03',
      'stroke-width': 4,
    },
  }
}
