import Head from 'next/head'
import DirBrowser from '../components/dir/DirBrowser'
import { useMap } from '../hooks/useMap'

import styles from '../styles/Home.module.scss'

export default function Home() {
  const Map = useMap()
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
          <DirBrowser />
        </aside>
        <main className={styles.main}>
          <div className={styles.mapWrapper}>
            <Map />
          </div>
        </main>
      </div>
    </div>
  )
}
