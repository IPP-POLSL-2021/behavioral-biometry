import { useNavigate } from "react-router";
import WordState from "../../Components/WordState";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      Home Page
      <div>
        <a onClick={() => navigate("/offline")}>nologin</a>
      </div>
      <div>
        <a onClick={() => navigate("/wordstate")}>start</a>
      </div>
      Powiem tyle że <WordState word="Linux cię wita!" onCompleted={() => {}} automatic /> Wypierdalać z uczelni.
    </div>
  )
}

export default HomePage;