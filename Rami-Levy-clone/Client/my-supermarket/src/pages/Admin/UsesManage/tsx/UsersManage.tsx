import React, { useEffect, useState, ChangeEvent } from "react";
import { allUsersSelector } from "../../../../features/all_users_admin/allUsersSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { getAllUsersApi } from "../../../../features/all_users_admin/allUsersAPI";
import { useNavigate } from "react-router";
import { User } from "../../../../rami-types";
import UserCard from "./UserCard";
import "../scss/UsersManage.scss";
import RamiBtn from "../../../../components/RamiBtn/RamiBtn";

const UsersManage = () => {
  const [isUsersShown, setIsUsersShown] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Initialize filteredUsers state
  const allUsers = useAppSelector(allUsersSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsersApi());
  }, []);

  useEffect(() => {
    // Update filteredUsers whenever allUsers or searchEmail changes
    const updatedFilteredUsers = allUsers?.filter((user) =>
      user.email.includes(searchEmail)
    );
    if (updatedFilteredUsers) setFilteredUsers(updatedFilteredUsers);
  }, [allUsers, searchEmail]);

  const showAllUsers = () => {
    setIsUsersShown(true);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(e.target.value);
  };

  return (
    <div className="users-manage-main">
      <div>
        {isUsersShown && (
          <input
            type="text"
            placeholder="Search by email"
            className="search-email"
            value={searchEmail}
            onChange={handleSearchChange}
          />
        )}
      </div>
      {isUsersShown &&
        filteredUsers.map((user) => {
          return <UserCard key={user.user_id} user={user} />;
        })}
      <RamiBtn onClick={showAllUsers}>חפש משתמש</RamiBtn>
      <RamiBtn onClick={() => navigate(-1)}>חזור</RamiBtn>
    </div>
  );
};

export default UsersManage;
