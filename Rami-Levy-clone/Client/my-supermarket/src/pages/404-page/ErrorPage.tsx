import "./error-page.scss";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/"); // navigate to the home page
  };

  return (
    <div className="error-page-wrap">
      <img
        className="crying-tomato"
        src="/src/assets/img/404-page.png"
        alt="404 page not found"
      ></img>
      <p className="page-not-found">העמוד המבוקש לא נמצא</p>
      <button className="Err-to-hp" onClick={handleReturnHome}>
        תחזירו אותי הביתה
      </button>
    </div>
  );
}
