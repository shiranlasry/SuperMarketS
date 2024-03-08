import React from "react";
import "./home.scss";

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-greet">ברוך הבא לרמי לוי</h1>
          <p>הקניון שלך באינטרנט</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
