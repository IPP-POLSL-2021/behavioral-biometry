import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      Home Page
      <div>
        <a onClick={() => navigate("/offline", {replace: true})}>nologin</a>
      </div>
      <div>
        <a onClick={() => navigate("/wordstate", {replace: true})}>start</a>
      </div>
    </div>
  )
}
export default HomePage;