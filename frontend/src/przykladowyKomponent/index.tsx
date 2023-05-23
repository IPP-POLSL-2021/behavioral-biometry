import { useEffect, useState } from "react";

import { getMessageFromServer } from "./przykladoweHelpery";

import styles from "./style.module.scss";

const PrzykladowyKomponent = () => {
  const [isMessageLoaded, setMessageLoaded] = useState(false);
  const [isMessageLoadingError, setMessageLoadingError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessageFromServer(true)
      .then((newMessage) => {
        console.log(newMessage, "jd");
        setMessage(newMessage);
        setMessageLoaded(true);
      })
      .catch(() => {
        setMessageLoaded(true);
        setMessageLoadingError(true);
      });
  }, []);

  if (!isMessageLoaded) {
    return <div>loading</div>;
  }

  return (
    <div className={styles.przykladowy_styl}>
      {!isMessageLoadingError ? (
        <p className={styles.kurwe_zwisa}>{message}</p>
      ) : (
        <p>loading error</p>
      )}
    </div>
  );
};

export default PrzykladowyKomponent;
