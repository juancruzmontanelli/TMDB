import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import Card from "../commons/Card";
import axios from "axios";
import Grid from "../components/Grid";

// este componente es el prefil del usuario loggeado
const User = () => {
  const { user, toogleUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [favMovies, setFavMovies] = useState();
  const [favTv, setFavTv] = useState();

  useEffect(() => {
    axios
      .get(`/users/favorites/movie/${user.id}`)
      .then((favorite) => setFavMovies(favorite.data));

    axios
      .get(`/users/favorites/tv/${user.id}`)
      .then((favorite) => setFavTv(favorite.data));
  }, []);

  const logout = () => {
    const logOutUser = {
      user: null,
    };
    Cookie.remove("token");
    toogleUser(logOutUser);
    navigate("/");
  };

  return (
    <div className="box column is-4 m-2">
      <div className="is-flex ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        </svg>
        <h2>{user.name}</h2>
      </div>
      <p>{user.email}</p>
      <h2>Favorites</h2>

      <h3>Movies</h3>
      <div className="is-flex">
        {favMovies ? (
          favMovies.map((movie) => (
            <div className="m-2">
              <Card data={movie} />
            </div>
          ))
        ) : (
          <p>you don have favorite</p>
        )}
      </div>
      <h3>TV Shows</h3>

      <div className="is-flex">
        {favTv ? (
          favTv.map((movie) => (
            <div className="m-2">
              <Card data={movie} />
            </div>
          ))
        ) : (
          <p>you don have favorite</p>
        )}
      </div>
      <button className="" onClick={logout}>
        LOGOUT
      </button>
    </div>
  );
};

export default User;
