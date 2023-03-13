import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";



// este componente es la bara de navegacion 
const Navbar = () => {
  const url = useLocation().pathname;
  const { user, toogleUser } = useContext(UserContext);
  return (
    <nav className="flex justify-between px-8 py-4">
      <Link to="/">
        <div className="bg-black p-2 rounded-xl">
          <h3 className="">TMDB</h3>
        </div>
      </Link>
      <div className="flex space-x-4">
      <Link to="/">
          <button className="m-2">Home</button>
        </Link>
        <Link to="collection/movie">
          <button className="m-2">Movies</button>
        </Link>
        <Link to="collection/tv">
          <button className="m-2">TV Shows</button>
        </Link>
        <Link to="users">
          <button className="m-2">Users</button>
        </Link>

        {user.id ? (
          <Link to={`user/${user.id}`}>
          <div className="">
            <h4 className="m-2">{user.name}</h4>
          </div>
          </Link>
        ) : !url.includes("login") ? (
            <Link to="users/login">
          <button className="bg-black rounded-xl p-2 ">
              <strong>Login</strong>
          </button>
            </Link>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
