import { useEffect } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";

// esto es para mantener el usuario logeado
const Home = () => {
  const {user, toogleUser} = useContext(UserContext)
useEffect(() => {
    axios
    .get('/users/me')
    .then((user) => toogleUser(user.data))

  }, []);
    return (
       ''
    )

}

export default Home