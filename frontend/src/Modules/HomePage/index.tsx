import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <a onClick={() => navigate("/wordstate")}>authenticate</a>
    </div>
  );
};

export default HomePage;
