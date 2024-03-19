import React from "react";
import "./home.scss";
import BestSellers from "./BestSellers/BestSellers";

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-container">
        <div className="home-content">
          <BestSellers />
        </div>
      </div>
    </div>
  );
};

export default Home;
