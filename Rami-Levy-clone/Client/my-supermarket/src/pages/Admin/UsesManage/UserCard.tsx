import React, { useState } from 'react'
import { User } from '../../../rami-types';
import './userCard.scss';
import UpdateUserRole from './UpdateUserRole';
import DeleteUser from './DeleteUser';

type UserCardProps = {
    user: User;
  };
  const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const [isPopRole, setIsPopRole] = useState(false);
    const [isPopDelete, setIsPopDelete] = useState(false);
    const popUpdateRole = () => {
        setIsPopRole(true);
 
    }
    const popDelete = () => {
        setIsPopDelete(true);
    }
    const hendelClose = () => {
        setIsPopRole(false);
        setIsPopDelete(false);
    }
  return (
    <div>
        {user && <>
        <div className='user-card'>
            <h3>{user.email}</h3>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
            <p>{user.role_name}</p>
            <button>ערוך</button>
            <button  onClick={popDelete}>מחק</button>
            <button onClick={popUpdateRole}>עדכן הרשאה</button>
            <button>איפוס סיסמא </button>
            {isPopRole && <UpdateUserRole user={user} onClose={hendelClose} />}
            {isPopDelete && <DeleteUser user={user} onClose={hendelClose} />}
        </div>
        </>}
      
    </div>
  )
}

export default UserCard
