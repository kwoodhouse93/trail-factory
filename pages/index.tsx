import Head from 'next/head'
import { useState } from 'react'

import DirBrowser from 'components/dir/DirBrowser'
import TrackViewer from 'components/trackViewer/TrackViewer'

import styles from 'styles/pages/Home.module.scss'

export default function Home() {
  const [selectedPath, setSelectedPath] = useState(undefined)

  return (
    <div>
      <Head>
        <title>Trail Factory</title>
        <meta name="description" content="Import/combine/edit GPS tracks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>
          Trail Factory
        </h1>
      </header>

      <div className={styles.wrapper}>
        <aside className={styles.sidebar}>
          <DirBrowser setFullPath={setSelectedPath} />
        </aside>
        <main className={styles.main}>
          <div className={styles.mapWrapper}>
            <TrackViewer path={selectedPath} />
          </div>
        </main>
      </div>
    </div>
  )
}
