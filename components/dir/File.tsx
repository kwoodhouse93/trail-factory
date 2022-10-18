import { cn } from 'lib/styles'

import styles from 'styles/components/dir/File.module.scss'

const File = ({ name, onClick, selected, className }) => {
  const fileClasses = [className]
  if (selected) {
    fileClasses.push(styles.selected)
  }

  return <a href="#" onClick={onClick}>
    <li className={cn(...fileClasses)}>
      {name}
    </li>
  </a>
}

export default File
