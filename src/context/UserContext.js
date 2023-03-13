import { createContext, useState } from "react";
import axios from "axios";

// este es el context global del usuario
const defaultUser = {
  id: null,
  name: null,
  email: null,
  tv: [],
  movie: [],
  toogleUser: () => null,
};


export const UserContext = createContext(defaultUser);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: null,
    email: null,
    tv: [],
    movie: [],
  });


  const toggleUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      tv: user.tv,
      movie: user.movies,
    });
  };


  const toggleFavorite = (id) => {

    axios
    .get(`/users/favorites/movie/${id}`)
    .then((fav) => {  
      user.movie = fav.data
    });
    
    axios
    .get(`/users/favorites/tv/${id}`)
    .then((fav) => {
      user.tv = fav.data

    });

  };
  const toggleAddFavorite = (data, type) => {
    console.log(data)
     user[type].push(data)
  };
  const toggleDeleteFavorite = (data, type) => {
    console.log(data)
     user[type].pop(data)
     console.log(user[type])
  };
  return (
    <UserContext.Provider value={{ user, toggleUser, toggleAddFavorite, toggleDeleteFavorite, toggleFavorite }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
