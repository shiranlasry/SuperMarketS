import { Link } from "react-router-dom"; // Import Link from React Router
import "./info-center.scss";

export default function InfoCenter() {
  return (
    <div className="info-cener-main">
      <h1 className="info-center-title"> נושאים פופולריים</h1>
      <div className="info-content">
        <div className="info-icon">
          <img className="my-orders-icon" src="./src/assets/img/faq.png" />
        </div>
        <div className="info-icon">
          <img
            className="my-orders-icon clock"
            src="./src/assets/img/clock.png"
          />
        </div>
        <div className="info-icon">
          <img
            className="my-orders-icon"
            src="./src/assets/img/lock-pass.png"
          />
        </div>
      </div>
      <div className="info-links">
        <Link to="#">סניפי הרשת</Link>
        {/* Use Link to navigate to the accessibility page */}
        <Link to="/accessibility">הצהרת נגישות</Link>
        <Link to="#">מדיניות פרטיות</Link>
        <Link to="#">תקנון ותנאי שימוש</Link>
      </div>
    </div>
  );
}
