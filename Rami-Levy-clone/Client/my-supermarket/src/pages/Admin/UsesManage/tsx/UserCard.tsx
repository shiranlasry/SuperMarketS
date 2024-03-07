import React, { useState } from 'react'
import { User } from '../../../../rami-types';
import '../scss/UserCard.scss';
import UpdateUserRole from './UpdateUserRole';
import DeleteUser from './DeleteUser';
import ResetPassword from './ResetPassword';
import UpdateDetails from './UpdateDetails';

type UserCardProps = {
    user: User;
  };
  const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const [isPopRole, setIsPopRole] = useState(false);
    const [isPopDelete, setIsPopDelete] = useState(false);
    const [isPopUpdatePassword, setIsPopUpdatePassword] = useState(false);
    const [isPopUpdateDetails, setIsPopUpdateDetails] = useState(false);
    const popUpdateDetails = () => {
        setIsPopUpdateDetails(true);
    }
    const popUpdatePassword = () => {
      
        setIsPopUpdatePassword(true);
    }
    const popUpdateRole = () => {
        setIsPopRole(true);
 
    }
    const popDelete = () => {
        setIsPopDelete(true);
    }
    const hendelClose = () => {
        setIsPopRole(false);
        setIsPopDelete(false);
        setIsPopUpdatePassword(false);
        setIsPopUpdateDetails(false);
    }
  return (
    <div>
        {user && <>
        <div className='user-card'>
            <h3>{user.email}</h3>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
            <p>{user.role_name}</p>
            <button  onClick={popUpdateDetails}>ערוך</button>
            <button  onClick={popDelete}>מחק</button>
            <button onClick={popUpdateRole}>עדכן הרשאה</button>
            <button onClick={popUpdatePassword}>איפוס סיסמא </button>
            {isPopRole && <UpdateUserRole user={user} onClose={hendelClose} />}
            {isPopDelete && <DeleteUser user={user} onClose={hendelClose} />}
            {isPopUpdatePassword && <ResetPassword user={user} onClose={hendelClose} />}
            {isPopUpdateDetails && <UpdateDetails user={user} onClose={hendelClose} />}
        </div>
        </>}
      
    </div>
  )
}

export default UserCard
