import { flattenTracks, reverseTracks } from 'lib/geo/gpx'
import { toWKT } from 'lib/geo/wkt'
import { cn } from 'lib/styles'
import { useState } from 'react'
import styles from 'styles/components/export/PostgresExporter.module.scss'
import ExportImage from './ExportImage'


type FormData = {
  connection: string
  id: string
  name: string
  description: string
  overwrite: boolean
}

const PostgresExporter = ({ gpx, selected, reversed, trackOrder }) => {
  const [image, setImage] = useState<Blob | undefined>(undefined)

  let defaultFormData: FormData | undefined = undefined
  if (typeof window !== 'undefined') {
    const fd = localStorage.getItem('postgres-exporter-form-data')
    if (fd !== undefined) {
      defaultFormData = JSON.parse(fd)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (image === undefined) {
      alert('Please generate a thumbnail before submitting')
      return
    }
    const thumbnail = await blobToBase64(image)

    const data = {
      connection: event.target.connstr.value,
      id: event.target.id.value,
      name: event.target.name.value,
      description: event.target.description.value,
      overwrite: event.target.overwrite.checked,
      track: buildTrack(gpx, selected, reversed, trackOrder),
      thumbnail: thumbnail,
    }

    const JSONdata = JSON.stringify(data)

    if (typeof window !== 'undefined') {
      localStorage.setItem('postgres-exporter-form-data', JSON.stringify({
        connection: data.connection,
        id: data.id,
        name: data.name,
        description: data.description,
        overwrite: data.overwrite,
      }))
    }

    const endpoint = '/api/export/postgres'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    if (result.error !== undefined) {
      alert(result.error)
    } else if (result.data !== undefined) {
      alert(`${result.data}`)
    } else {
      alert('Insert successful')
    }
  }

  return <div className={styles.wrapper}>
    <h2>Export to Postgres</h2>
    <div className={styles.scrollArea}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label htmlFor='connstr'>
            Connection string
          </label>
          <input
            id='connstr'
            name='connstr'
            type='text'
            placeholder='postgres://user:pass@host:port/database?opts'
            required
            defaultValue={defaultFormData?.connection}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor='id'>
            ID
          </label>
          <input
            id='id'
            name='id'
            type='text'
            required
            defaultValue={defaultFormData?.id}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor='name'>
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            required
            defaultValue={defaultFormData?.name}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor='description'>
            Description
          </label>
        </div>
        <textarea
          id='description'
          name='description'
          rows={2}
          className={styles.textarea}
          defaultValue={defaultFormData?.description}
        />
        <div className={cn(styles.formRow, styles.checkboxRow)}>
          <label htmlFor='overwrite'>
            Overwrite existing
          </label>
          <input
            id='overwrite'
            name='overwrite'
            type='checkbox'
            defaultChecked={defaultFormData?.overwrite}
          />
        </div>
        <div className={styles.formRow}>
          <button type='submit'>
            Insert
          </button>
        </div>
      </form>
      <ExportImage
        gpx={gpx}
        selected={selected}
        reversed={reversed}
        trackOrder={trackOrder}
        image={image}
        setImage={setImage}
      />
    </div>
  </div>
}

export default PostgresExporter

const buildTrack = (gpx, selected, reversed, trackOrder) => {
  const points = buildPoints(gpx, selected, reversed, trackOrder)
  return toWKT(points)
}

export const buildPoints = (gpx, selected, reversed, trackOrder) => {
  const tracks = trackOrder.map(id => gpx.data.flat().find(t => t.id === id))
  return flattenTracks(
    reverseTracks(
      tracks.filter(t => selected.includes(t.id)),
      reversed
    )
  )
}

const blobToBase64: (Blob) => Promise<string> = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}
