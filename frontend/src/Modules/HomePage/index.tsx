import { useNavigate } from "react-router";

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
    </div>
  )
}
export default HomePage;