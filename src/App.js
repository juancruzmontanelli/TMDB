import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import Register from "./components/Register";
import Login from "./components/Login";
import Details from "./commons/Details";
import { Route, Routes } from "react-router";
import UserContextProvider from "./context/UserContext";
import Users from "./components/Users";
import Home from "./home";
import ProfileDetail from "./commons/ProfileDetails";
import "./App.css";
import Carousels from "./components/Carousels";

// app aca se hace toda la importacion de los componentes, tambien se hacen routeos

const App = () => {
  const [movies, setMovies] = useState([]);
  const [tvshows, setTvshows] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=2ce885ac9679e4394c7fbf74b3361710&language=en-US&page=1"
      )
      .then((res) => res.data)
      .then((data) => setMovies(data.results));

    axios
      .get(
        "https://api.themoviedb.org/3/tv/airing_today?api_key=2ce885ac9679e4394c7fbf74b3361710&language=en-US&page=1"
      )
      .then((res) => res.data)
      .then((data) => {
        setTvshows(data.results)
        
      })
    axios
      .get("/users")
      .then((res) => res.data)
      .then((data) => setUsers(data));
     
   
  }, []);

  const bestMovies = movies.filter((movie) => movie.vote_average > 7);
  const bestTvshows = tvshows.filter((tvshow) => tvshow.vote_average > 5.5);

  const fixRate = (dataArr) => {
    dataArr.map((data) => {
      data.filmId = data.id
      let vote = String(data.vote_average);

      if (!vote.includes(".")) {
        if (vote == 10) {
          Number(vote);
          data.vote_average = vote;
        } else {
          vote = vote + ".0";
          Number(vote);
          data.vote_average = vote;
        }

        
      }
    });
  };
  fixRate(tvshows)
  fixRate(movies)

  return (
    <div className="flex flex-col min-h-screen bg-custom-black">
      <UserContextProvider>
        <Navbar />
        <Home />

        <Routes>
          <Route
            path="/"
            element={<Carousels movies={bestMovies} tvshows={bestTvshows} />}
          />
          <Route path="users" element={<Users users={users} />} />
          <Route path="/:type/:id" element={<ProfileDetail />} />
          <Route path="collection/:type/single/:id" element={<Details />} />
          <Route
            path="collection/:type"
            element={<Grid movie={movies} tv={tvshows} />}
          />
          <Route path="collection/:type/single/:id/:is-favorite" element={<Details />} />
          <Route path="users/:type/:id" element={<ProfileDetail />} />
          <Route path="users/login" element={<Login />} />
          <Route path="users/register" element={<Register />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
};

export default App;
