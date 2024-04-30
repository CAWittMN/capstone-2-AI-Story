import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const AdminUserCard = ({ user }) => {
  const navigate = useNavigate();
  console.log(user);

  return (
    <div
      onClick={() => navigate(`/admin/${user.username}`)}
      className="m-5 bg-black rounded-3xl bg-opacity-20"
    >
      <Card
        className="h-[180px] w-[200px] md:w-full md:h-full border border-success border-opacity-10"
        isHoverable
      >
        <CardHeader>
          <h3 className="text-xl">
            {user.username} ID:{user.id}
          </h3>
        </CardHeader>
        <CardBody>
          <p>
            Full Name: {user.firstName} {user.lastName}
          </p>
          <p>Age: {user.age}</p>
          <p>Email: {user.email}</p>
          <p>Created At: {user.createdAt}</p>
          <p>Updated At:{user.updatedAt}</p>
        </CardBody>
        <CardFooter>
          {user.isAdmin ? "Admin" : "User"} --- Stories: {user.stories.length}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminUserCard;
