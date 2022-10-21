import { Track } from 'lib/types/tracks'
import * as xml2js from 'xml2js'

export const parseGPX = (filepath, gpx) => {
  var outputTrack = []
  xml2js.parseString(gpx, (err, result) => {
    if (err) {
      console.error(err)
      return
    }

    if (result.gpx.trk !== undefined) {
      var track = result.gpx.trk.map((t, i) => {
        const points = t.trkseg[0].trkpt.map(p => {
          return {
            lat: parseFloat(p.$.lat),
            lon: parseFloat(p.$.lon)
          }
        })
        return {
          name: t.name[0],
          id: filepath + i,
          points: points,
        }
      })
      outputTrack = track
      return
    }

    if (result.gpx.rte !== undefined) {
      var route = result.gpx.rte.map((r, i) => {
        const points = r.rtept.map(p => {
          return {
            lat: parseFloat(p.$.lat),
            lon: parseFloat(p.$.lon)
          }
        })
        return {
          name: r.name[0],
          id: filepath + i,
          points: points,
        }
      })
      outputTrack = route
      return
    }
  })
  return outputTrack
}

export const reverseTracks = (tracks: Track[], reverse: string[]) => {
  return tracks.map(t => {
    if (reverse.includes(t.id)) {
      return {
        ...t,
        points: t.points.reverse(),
      }
    }
    return t
  })
}

export const flattenTracks = (tracks) => {
  return tracks.map(t => t.points).flat()
}
