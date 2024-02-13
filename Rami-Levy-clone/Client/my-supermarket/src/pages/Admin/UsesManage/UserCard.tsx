import React, { useState } from 'react'
import { User } from '../../../rami-types';
import './userCard.scss';
import UpdateUserRole from './UpdateUserRole';

type UserCardProps = {
    user: User;
  };
  const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const [isPopRole, setIsPopRole] = useState(false);
    const popUpdateRole = () => {
        setIsPopRole(true);
        
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
            <button>מחק</button>
            <button onClick={popUpdateRole}>עדכן הרשאה</button>
            <button>איפוס סיסמא </button>
            {isPopRole && <UpdateUserRole user={user} />}
        </div>
        </>}
      
    </div>
  )
}

export default UserCard
