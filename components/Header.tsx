import { useState } from 'react'

import styles from 'styles/components/Header.module.scss'

const Header = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  return <header className={styles.wrapper}>
    <div className={styles.top}>
      <h1 className={styles.title}>
        Trail Factory
      </h1>
      <button className={styles.rest} onClick={() => setIsInfoOpen(x => !x)}>
        Info
      </button>
    </div>
    {isInfoOpen && <div className={styles.info}>
      <p>
        This is a tool for importing, combining, and editing GPS tracks.
      </p>
    </div>}
  </header>
}

export default Header
