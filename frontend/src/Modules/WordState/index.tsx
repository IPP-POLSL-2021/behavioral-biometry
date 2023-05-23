import { useEffect, useState } from "react";
import OnlineController from "../../Components/WordState/OnlineController";
import styles from "./style.module.scss";
import { convertPayload } from "../../Components/WordState/helpers";
import { Itoken } from "../../Components/WordState/interfaces";

import { useCookies } from "react-cookie";

type promptType = "fixed" | "flex" | "done";
type User = {
  id: number;
  userName: string;
};

const Auth = ({
  userId,
  loggedUserId,
}: {
  userId: number;
  loggedUserId: number;
}) => {
  const [promptType, setPromptType] = useState<promptType>("fixed");
  const [fixedAuth, setFixedAuth] = useState(false);
  const [flexAuth, setFlexAuth] = useState(false);

  const authenticateFixed = (letters: Itoken[]) => {
    const payload = convertPayload(letters);
    payload['loggedUserId'] = loggedUserId;

    fetch(`http://127.0.0.1:8000/fixed/${userId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((sucess) => setFixedAuth(sucess));
    setPromptType("flex");
  };

  const authenticateFlex = (letters: Itoken[]) => {
    const payload = convertPayload(letters);
    payload['loggedUserId'] = loggedUserId;

    fetch(`http://127.0.0.1:8000/flex/${userId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((sucess) => setFlexAuth(sucess));
    setPromptType("done");
  };

  return (
    <main className={styles.main}>
      {promptType === "fixed" ? (
        <OnlineController
          classNames={styles.main}
          apiUrl={`http://srv11.mikr.us:40210/api/users/${userId}/prompt`}
          onFinished={authenticateFixed}
        />
      ) : promptType === "flex" ? (
        <OnlineController
          classNames={styles.main}
          apiUrl={`http://srv11.mikr.us:40210/api/prompt/random`}
          onFinished={authenticateFlex}
        />
      ) : (
        <div className={styles["result-text"]}>
          <p>Authentication with fixed: {fixedAuth ? "true" : "false"}</p>
          <p>Authentication with flex: {flexAuth ? "true" : "false"}</p>
        </div>
      )}
    </main>
  );
};

const ProfileList = ({
  selectUserId,
  setLoggedUserId,
}: {
  selectUserId: (userId: number) => void;
  setLoggedUserId: (userId: number) => void;
}) => {
  const [profiles, setProfiles] = useState<User[]>([]);
  const [{ username }] = useCookies(["username"]);

  useEffect(() => {
    fetch("http://srv11.mikr.us:30210/api/users")
      .then((response) => response.json())
      .then((users: User[]) => {
        setLoggedUserId(users.find((user) => user.userName === username)!.id);
        setProfiles(users);
      });
  }, []);

  return (
    <div>
      Authenticate as:
      <ul>
        {profiles.map(({ id, userName }) => (
          <li key={id} onClick={() => selectUserId(id)}>
            {userName}
          </li>
        ))}
      </ul>
    </div>
  );
};

const WordState = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loggedUserId, setLoggedUserId] = useState<number | null>(null);

  if (!selectedUserId) {
    return (
      <ProfileList
        selectUserId={(userId) => setSelectedUserId(userId)}
        setLoggedUserId={setLoggedUserId}
      />
    );
  }
  return <Auth userId={selectedUserId} loggedUserId={loggedUserId!} />;
};

export default WordState;
