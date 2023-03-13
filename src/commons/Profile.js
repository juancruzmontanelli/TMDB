import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// este common muesta los usuarios registrados
const Profile = ({ user }) => {
  const { toggleFavorite } = useContext(UserContext);
  return (
    <Link to={`single/${user.id}`} onClick={() => { toggleFavorite(user.id)}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        fill="currentColor"
        className="border border-white rounded-full mx-auto p-2 my-4"
        viewBox="0 0 16 16"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
      </svg>
      <h2 className="text-4xl text-center">{user.name}</h2>
      <p className="underline text-2xl text-center my-6">{user.email}</p>
    </Link>
  );
};

export default Profile;
