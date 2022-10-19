import * as xml2js from 'xml2js'

export const parseGPX = (gpx) => {
  var outputTrack = []
  xml2js.parseString(gpx, (err, result) => {
    if (err) {
      console.error(err)
      return
    }
    var track = result.gpx.trk.map(t => {
      return t.trkseg[0].trkpt.map(p => {
        return {
          lat: parseFloat(p.$.lat),
          lon: parseFloat(p.$.lon)
        }
      })
    }).flat()
    outputTrack = track
  })
  return outputTrack
}
