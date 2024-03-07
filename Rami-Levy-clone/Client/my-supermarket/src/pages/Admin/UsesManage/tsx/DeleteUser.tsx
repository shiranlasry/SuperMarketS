import React from 'react'
import { User } from '../../../../rami-types';
import { deleteUserApi, getAllUsersApi } from '../../../../features/all_users_admin/allUsersAPI';
import { useAppDispatch } from '../../../../app/hook';
import '../scss/DeleteUser.scss';

type UserProps = {
    user: User;
    onClose: () => void;
};

const DeleteUser: React.FC<UserProps> = ({ user, onClose }) => {
    const dispatch = useAppDispatch();
    const deleteUser = async () => {
        await dispatch(deleteUserApi(user.user_id));
        dispatch(getAllUsersApi());
        onClose();
    }

    return (
        <div className='delete-user'>
            <h1> האם אתה בטוח שברצונך למחוק משתמש זה לצמיתות?</h1>
            <div>
                <label>שם מלא:</label>
                <span>{`${user.first_name} ${user.last_name}`}</span>
            </div>
            <div>
                <label>מייל:</label>
                <span>{user.email}</span>
            </div>
            <div>
                <label>הרשאה:</label>
                <span>{user.role_name}</span>
            </div>
            <button onClick={deleteUser}>מחק</button>
            <button onClick={onClose}>ביטול</button>

        </div>
    )
}

export default DeleteUser
