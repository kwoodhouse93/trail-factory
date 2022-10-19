import { flattenTracks } from 'lib/geo/gpx'
import { toWKT } from 'lib/geo/wkt'
import { cn } from 'lib/styles'
import styles from 'styles/components/export/PostgresExporter.module.scss'

const PostgresExporter = ({ gpx, selected }) => {

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      connection: event.target.connstr.value,
      id: event.target.id.value,
      name: event.target.name.value,
      description: event.target.description.value,
      overwrite: event.target.overwrite.checked,
      track: buildTrack(gpx, selected),
    }

    const JSONdata = JSON.stringify(data)

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
    <form onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <label htmlFor='connstr'>
          Connection string
        </label>
        <input id='connstr' name='connstr' type='text' placeholder='postgres://user:pass@host:port/database?opts' required />
      </div>
      <div className={styles.formRow}>
        <label htmlFor='id'>
          ID
        </label>
        <input id='id' name='id' type='text' required />
      </div>
      <div className={styles.formRow}>
        <label htmlFor='name'>
          Name
        </label>
        <input id='name' name='name' type='text' required />
      </div>
      <div className={styles.formRow}>
        <label htmlFor='description'>
          Description
        </label>
      </div>
      <textarea id='description' name='description' rows={3} className={styles.textarea} />
      <div className={cn(styles.formRow, styles.checkboxRow)}>
        <label htmlFor='overwrite'>
          Overwrite existing
        </label>
        <input id='overwrite' name='overwrite' type='checkbox' />
      </div>
      <div className={styles.formRow}>
        <button type='submit'>
          Insert
        </button>
      </div>
    </form>
  </div>
}

export default PostgresExporter

const buildTrack = (gpx, selected) => {
  return toWKT(
    flattenTracks(
      gpx.data.filter(t => selected.includes(t.indexInFile)
      )
    )
  )
}
