import OnlineController from '../../Components/WordState/OnlineController'
import styles from './style.module.scss'

const WordState = () => {
  return (
    <main className={styles.main}>
      <OnlineController classNames={styles.main} apiUrl='http://localhost:5050/api/user/authenticate'/>
    </main>
  )
}

export default WordState;