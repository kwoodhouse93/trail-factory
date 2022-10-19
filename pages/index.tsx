import Head from 'next/head'
import { useState } from 'react'

import Header from 'components/Header'
import DirBrowser from 'components/dir/DirBrowser'
import TrackList from 'components/trackViewer/TrackList'
import TrackViewer from 'components/trackViewer/TrackViewer'
import useGPXFile from 'hooks/useGPXFile'
import useHighlightTracks from 'hooks/useHighlightTracks'

import styles from 'styles/pages/Home.module.scss'

export default function Home() {
  const [selectedPath, setSelectedPath] = useState(undefined)

  const gpx = useGPXFile(selectedPath)
  const gpxValid = gpx !== null && gpx.data !== undefined && !gpx.error

  const { highlighted, highlightTrack, unhighlightTrack } = useHighlightTracks()

  return (
    <div>
      <Head>
        <title>Trail Factory</title>
        <meta name="description" content="Import/combine/edit GPS tracks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.wrapper}>
        <aside className={styles.sidebar}>
          <DirBrowser setFullPath={setSelectedPath} />
          {gpxValid && <TrackList
            tracks={gpx.data}
            highlightTrack={highlightTrack}
            unhighlightTrack={unhighlightTrack}
          />
          }
        </aside>
        <main className={styles.main}>
          <div className={styles.mapWrapper}>
            <TrackViewer gpx={gpx} highlighted={highlighted} />
          </div>
        </main>
      </div>
    </div>
  )
}
