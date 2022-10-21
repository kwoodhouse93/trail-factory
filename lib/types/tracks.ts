export type Point = {
  lat: number,
  lon: number,
}

export type Track = {
  id: string
  name: string
  points: Point[]
}

export const palette = [
  '#e41a1c',
  '#377eb8',
  '#4daf4a',
  '#984ea3',
  '#ff7f00',
  '#ffff33',
]

export const getTrackColor = (index: number) => {
  return palette[index % palette.length]
}
