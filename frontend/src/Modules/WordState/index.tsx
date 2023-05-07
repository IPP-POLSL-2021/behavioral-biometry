import { useEffect, useState } from 'react';
import OnlineController from '../../Components/WordState/OnlineController'
import styles from './style.module.scss'
import { convertPayload } from '../../Components/WordState/helpers';
import { Itoken } from '../../Components/WordState/interfaces';

type promptType = 'fixed' | 'flex' | 'done';

const Auth = ({userId}: {userId: number}) => {
  const [ promptType, setPromptType ] = useState<promptType>('fixed');
  const authenticateFixed = (letters: Itoken[]) => {
    fetch(`http://localhost:5050/api/users/${userId}/fixed`, {
      method: 'POST',
      body: JSON.stringify(convertPayload(letters))
    }).then(r => r.json()).then(d => console.log(d))
    setPromptType('flex')
  }

  const authenticateFlex = (letters: Itoken[]) => {
    fetch(`http://localhost:5050/api/users/${userId}/flex`, {
      method: 'POST',
      body: JSON.stringify(convertPayload(letters))
    }).then(r => r.json()).then(d => console.log(d))
    setPromptType('done')
  }
  return (
    <main className={styles.main}>
      {promptType === 'fixed' ? (
        <OnlineController
          classNames={styles.main}
          apiUrl={`http://localhost:5050/api/users/${userId}/prompt`}
          onFinished={authenticateFixed}
        />
      ) : promptType === 'flex' ? (
        <OnlineController
          classNames={styles.main}
          apiUrl={`http://localhost:5050/api/prompt/random`}
          onFinished={authenticateFlex}
        />
      ) : (
        <>gotowe</>
      )}
    </main>

  )
}

const ProfileList = ({selectUserId}: {selectUserId: (userId: number) => void}) => {
  const [ profiles, setProfiles ] = useState([])
  useEffect(() => {
    fetch('http://localhost:5050/api/users')
      .then(response => response.json())
      .then(data => {
        setProfiles(data.map((user: any) => ({
          username: user.userName,
          id: user.id,
        })));
      })
  }, [])
  return (
    <div>
      Authenticate as:
      <ul>
        {profiles.map(({username, id}) => (
          <li onClick={() => selectUserId(id)}>{username}</li>
        ))}
      </ul>
    </div>
  )
}

const WordState = () => {
  const [ selectedUserId, setSelectedUserId ] = useState<number>();

  if(!selectedUserId) {
    return (
      <ProfileList selectUserId={(userId) => setSelectedUserId(userId)} />
    )
  }
  return (
    <Auth userId={selectedUserId}/>
  )
}

export default WordState;