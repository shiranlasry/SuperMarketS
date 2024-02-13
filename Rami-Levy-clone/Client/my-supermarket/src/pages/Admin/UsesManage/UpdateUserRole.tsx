import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { rolesSelector } from '../../../features/roles/rolesSlice';
import { getAllRolesAPI } from '../../../features/roles/rolesAPI';
import { User, Role } from '../../../rami-types';
import { getAllUsersApi, updateUserRoleApi } from '../../../features/all_users_admin/allUsersAPI';

type UserProps = {
  user: User;
};

const UpdateUserRole: React.FC<UserProps> = ({ user }) => {
  const rolesDB = useAppSelector(rolesSelector);
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<number | null>(user.role_id);

  useEffect(() => {
    if (!rolesDB || rolesDB.length === 0) {
      dispatch(getAllRolesAPI());
    }
  }, [dispatch, rolesDB]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roleId = parseInt(event.target.value, 10);
    setSelectedRole(roleId);
    // You may dispatch an action to update user's role here
  };
  const saveUserRole = async () => {  
    const userRoleargs = {
        user_id: user.user_id,
        role_id: selectedRole,
    }
    await dispatch (updateUserRoleApi(userRoleargs));
    dispatch(getAllUsersApi());
  }

  return (
    <div>
      <h1>Update User Role</h1>
      <div>
        <label>User Name:</label>
        <span>{`${user.first_name} ${user.last_name}`}</span>
      </div>
      <div>
        <label>Select Role:</label>
        <select value={selectedRole || ''} onChange={handleRoleChange}>
          <option value="">Select Role</option>
          {rolesDB &&rolesDB.map((role: Role) => (
            <option key={role.role_id} value={role.role_id}>
              {role.role_name}
            </option>
          ))}
        </select>
        <button onClick={saveUserRole}>עדכן</button>
      </div>
    </div>
  );
};

export default UpdateUserRole;
