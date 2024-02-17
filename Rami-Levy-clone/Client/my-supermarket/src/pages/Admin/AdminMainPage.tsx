import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';
import { loggedInUserSelector } from '../../features/logged_in_user/loggedInUserSlice';
import './AdminMainPage.scss';

const AdminMainPage = () => {

    const navigate = useNavigate();

    const loggedInUser = useAppSelector(loggedInUserSelector);
const manageUsersPressed = () => {
        navigate('/manage_users');
}
const manageProductsPressed = () => {
        navigate('/manage_products');   }

   
    return (
        <div className='admin-main-page-container'>
            <h1>איזור מנהלים</h1>
            {loggedInUser && <h2>ברוך הבא בוס גדול  {loggedInUser.first_name}</h2>}

          
            <button onClick={manageProductsPressed}>נהל מוצרים</button>
            <button onClick={manageUsersPressed}>נהל משתמשים</button>
            <button onClick={() => navigate('/')}>חזור</button>



        </div>
    )
}

export default AdminMainPage
