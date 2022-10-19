export const toWKT = (track) => {
  const points = track.map(function (r) { return r.lon + " " + r.lat }).join(', ')
  return "LINESTRING(".concat(points, ")")
}
