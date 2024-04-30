import { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";

import AdminUserCard from "./AdminUserCard";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const { adminGetAllUsers } = useContext(AppContext);

  useEffect(() => {
    const getUsers = async () => {
      let users = await adminGetAllUsers();
      setUsers(users);
    };
    getUsers();
  }, []);

  const userCards = users.map((user) => (
    <AdminUserCard key={user.username} user={user} />
  ));

  return (
    <div className="flex flex-col items-center w-[80vw]">
      <h2 className="text-2xl">Users</h2>
      <div>
        <ul className="flex flex-col md:flex-row flex-wrap">{userCards}</ul>
      </div>
    </div>
  );
};

export default AdminUserList;
