import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Caruosel from "./Caruosel";
import { useNavigate, Route, Routes } from "react-router";
import Cookie from "js-cookie";
import { UserContext } from "../context/UserContext";

// este common es para ver los detalles de un usuario registrado
const ProfileDetails = () => {
  const { id, type } = useParams();
  const [userNotLog, setUser] = useState();
  const [favMovies, setFavMovies] = useState();
  const [favTv, setFavTv] = useState();
  const navigate = useNavigate();
  const { user, toggleUser   } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`/users/user/${id}`)
      .then((user) => user.data)
      .then((data) => {
        setUser(data);
      });
    axios.get(`/users/favorites/movie/${id}`).then((favorite) => {
      setFavMovies(favorite.data);
    });

    axios.get(`/users/favorites/tv/${id}`).then((favorite) => {
      setFavTv(favorite.data);
    });
  }, []); 

  const logout = () => {
    const logOutUser = {
      user: null,
    };
    Cookie.remove("token");
    toggleUser(logOutUser);
    navigate("/");
  };

  // los ternarios son para evitar errores que me aparecias, haciendo esto logro mostrar las cosas que quiero
  return (
    <div className="m-6 p-4 flex flex-col justify-between shadow-black shadow-around min-h-screen bg-neutral-700">
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

      <h2 className="text-4xl text-center font-bold mx-6">
        {userNotLog ? user.name : ""}
      </h2>

      <h2 className="text-2xl font-bold text-center my-8">Favorites</h2>

      <h3 className="text-2xl my-2">Movies</h3>

      <div className="">
        {favMovies ? (
          <Caruosel date={favMovies} type={"movie"} />
        ) : (
          <p>you don have favorite</p>
        )}
      </div>
      <h3 className="text-2xl my-2">TV Shows</h3>

      <div className="">
        {favTv ? (
          <Caruosel date={favTv} type={"tv"} />
        ) : (
          <p>you don have favorite</p>
        )}
      </div>
      <div className="flex">
        <p className="text-xl my-2">Email :</p>
        <p className="underline text-xl  my-2"> {user ? user.email : ""}</p>
      </div>
      {type == "user" ? (
        <button
          className="border border-red p-2 w-20 self-center m-4 bg-red rounded-lg"
          onClick={logout}
        >
          LOGOUT
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileDetails;
