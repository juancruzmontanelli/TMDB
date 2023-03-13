import { Link } from "react-router-dom";
import Card from "../commons/Card";
import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

// este componente es una grilla de peliculas
const Grid = (props) => {
  const { type } = useParams();
  const { user } = useContext(UserContext);
  const collection = props[type]
  

 
  // const favorite = () => {
 
  //   if (user[type]) {
   

  //     user[type].map((fav) => {
  //       if(fav.filmId == data.id) setIsFavorite(true)

  //     });
 
  //   }
  // };


  return (
    <div className="m-auto">
      <p className="text-2xl text-center underline font-bold"> Now Playing</p>
    <div className="grid grid-cols-4 gap-4 py-4 justify-items-center">
      {collection.map((data, i) => (
          <div className="p-6 w-full h-full shadow-black shadow-around  bg-neutral-700" key={i}>
       
            <Card data={data} type={type} />
          
          </div>
      ))}
    
    </div>
  </div>
  );
};

export default Grid;
