import Head from 'next/head'
import { useState } from 'react'

import Header from 'components/Header'
import DirBrowser from 'components/dir/DirBrowser'
import TrackList from 'components/track/TrackList'
import TrackViewer from 'components/track/TrackViewer'
import useGPXFiles from 'hooks/useGPXFiles'
import useHighlightTracks from 'hooks/useHighlightTracks'

import styles from 'styles/pages/Home.module.scss'
import useTrackSelection from 'hooks/useTrackSelection'
import PostgresExporter from 'components/export/PostgresExporter'
import useTrackOrder from 'hooks/useTrackOrder'

export default function Home() {
  const [selectedPaths, setSelectedPaths] = useState(undefined)


  const { highlighted, highlightTrack, unhighlightTrack } = useHighlightTracks()
  const { selected, selectTrack, unselectTrack, setNewTrackIDs } = useTrackSelection([])
  const ts = useTrackSelection([])
  const reversed = ts.selected, reverseTrack = ts.selectTrack, unreverseTrack = ts.unselectTrack
  const { trackOrder, moveTrackUp, moveTrackDown, setTrackOrderIDs } = useTrackOrder()

  const gpx = useGPXFiles(selectedPaths, setNewTrackIDs, setTrackOrderIDs)
  const gpxValid = gpx !== null && gpx.data !== undefined && !gpx.error

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
          <DirBrowser setFullPaths={setSelectedPaths} />
          {gpxValid &&
            <>
              <TrackList
                tracks={gpx.data.flat()}
                highlightTrack={highlightTrack}
                unhighlightTrack={unhighlightTrack}
                selected={selected}
                selectTrack={selectTrack}
                unselectTrack={unselectTrack}
                reversed={reversed}
                reverseTrack={reverseTrack}
                unreverseTrack={unreverseTrack}
                trackOrder={trackOrder}
                moveTrackUp={moveTrackUp}
                moveTrackDown={moveTrackDown}
              />
              <PostgresExporter
                gpx={gpx}
                selected={selected}
                reversed={reversed}
                trackOrder={trackOrder}
              />
            </>
          }
        </aside>
        <main className={styles.main}>
          <div className={styles.mapWrapper}>
            <TrackViewer
              gpx={gpx}
              highlighted={highlighted}
              selected={selected}
              reversed={reversed}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
