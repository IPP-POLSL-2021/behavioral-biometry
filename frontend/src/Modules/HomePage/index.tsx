import { useNavigate } from "react-router";
import styles from './style.module.scss';


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <a onClick={() => navigate('/wordstate')} className={styles.pointy}>START</a>
    </div>
  );
};

export default HomePage;
