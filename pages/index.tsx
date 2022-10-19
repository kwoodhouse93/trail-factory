import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'

import Header from 'components/Header'
import DirBrowser from 'components/dir/DirBrowser'
import TrackList from 'components/trackViewer/TrackList'
import TrackViewer from 'components/trackViewer/TrackViewer'
import useGPXFile from 'hooks/useGPXFile'
import useHighlightTracks from 'hooks/useHighlightTracks'

import styles from 'styles/pages/Home.module.scss'
import useTrackSelection from 'hooks/useTrackSelection'
import PostgresExporter from 'components/export/PostgresExporter'

export default function Home() {
  const [selectedPath, setSelectedPath] = useState(undefined)

  const gpx = useGPXFile(selectedPath)
  const gpxValid = gpx !== null && gpx.data !== undefined && !gpx.error

  const { highlighted, highlightTrack, unhighlightTrack } = useHighlightTracks()
  const { selected, selectTrack, unselectTrack, initTracks } = useTrackSelection([])

  useEffect(() => {
    if (Array.isArray(gpx?.data)) {
      initTracks(gpx.data.map(t => t.indexInFile))
    }
  }, [gpx?.data])

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
          {gpxValid &&
            <>
              <TrackList
                tracks={gpx.data}
                highlightTrack={highlightTrack}
                unhighlightTrack={unhighlightTrack}
                selected={selected}
                selectTrack={selectTrack}
                unselectTrack={unselectTrack}
              />
              <PostgresExporter gpx={gpx} selected={selected} />
            </>
          }
        </aside>
        <main className={styles.main}>
          <div className={styles.mapWrapper}>
            <TrackViewer gpx={gpx} highlighted={highlighted} selected={selected} />
          </div>
        </main>
      </div>
    </div>
  )
}
