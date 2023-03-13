import React from "react";

import "react-multi-carousel/lib/styles.css";

import Carousel from "../commons/Caruosel";
import Slider from "./Slider";

const Carousels = ({ movies, tvshows }) => {


 
  return (
    <div className="">
      <Slider /> 
      <h3 className="m-4 text-xl font-bold">Movies Recomended</h3>
      <Carousel date={movies} type={'movie'}/>
      <h3 className="m-4 text-xl font-bold ">TV Shows Recomended</h3>
      <Carousel date={tvshows} type={'tv'}/>
    </div>
  );
};

export default Carousels
