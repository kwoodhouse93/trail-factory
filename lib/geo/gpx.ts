import * as xml2js from 'xml2js'

export const parseGPX = (gpx) => {
  var outputTrack = []
  xml2js.parseString(gpx, (err, result) => {
    if (err) {
      console.error(err)
      return
    }
    var track = result.gpx.trk.map((t, i) => {
      const points = t.trkseg[0].trkpt.map(p => {
        return {
          lat: parseFloat(p.$.lat),
          lon: parseFloat(p.$.lon)
        }
      })
      return {
        name: t.name[0],
        indexInFile: i,
        points: points,
      }
    })
    outputTrack = track
  })
  return outputTrack
}

export const flattenTracks = (tracks) => {
  return tracks.map(t => t.points).flat()
}
