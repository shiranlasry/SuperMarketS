import './navBar.scss'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <ul id="main-menu" className="menu d-lg-flex showMenu justify-content-between">
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/sale">Sale</Link>
        </li>
        <li>
          <Link to="/fruits">Fruits & Vegetables</Link>
        </li>
        <li>
          <Link to="/milk">milk & eggs</Link>
        </li>
        <li>
          <Link to="/meat">meat & fish</Link>
        </li>
        <li>
          <Link to="/organic">organic</Link>
        </li>
        <li>
          <Link to="/frozen">frozen</Link>
        </li>
        <li>
          <Link to="/conserves">conserves & bake</Link>
        </li>
        <li>
          <Link to="/pease">pease</Link>
        </li>
        <li>
          <Link to="/sweets">sweets</Link>
        </li>
        <li>
          <Link to="/drinks">drinks</Link>
        </li>
        <li>
          <Link to="/recycle">recycle</Link>
        </li>
        <li>
          <Link to="/home">home & pets</Link>
        </li>
        <li>
          <Link to="/Pharm">Pharm & Babies</Link>
        </li>
        <li>
          <Link to="/bread">bread & pastry</Link>
        </li>
      </ul>
    );
  };
  
  export default NavBar;