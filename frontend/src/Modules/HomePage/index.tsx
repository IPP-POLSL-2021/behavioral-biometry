import { useState } from 'react';
import { useNavigate } from "react-router";
import styles from './style.module.scss';
import OnlineController from '../../Components/WordState/OnlineController';


const HomePage = () => {
  const [ isStarted, setStarted ] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div>
      <a onClick={() => navigate('/wordstate')}>authenticate</a>
    </div>
  )
}

export default HomePage;