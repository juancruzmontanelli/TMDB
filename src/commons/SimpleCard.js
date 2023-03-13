import React from "react";
import {  useNavigate, useLocation } from "react-router-dom";


const SimpleCard = ({data, type}) => {
  const navigate = useNavigate()
  

    return (


        <img
        src={
          data.poster_path
          ? "https://www.themoviedb.org/t/p/w220_and_h330_face/" +
          data.poster_path
          : "https://www.themoviedb.org/t/p/w220_and_h330_face/" + data.img
        }
        alt="Placeholder image"
        className="w-full"
        onClick={() => {navigate(`/collection/${type}/single/${data.filmId}`)}}
        />
        
      
    )
}

export default  SimpleCard