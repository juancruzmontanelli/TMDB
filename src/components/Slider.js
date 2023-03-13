import React from "react";
import { useState, useEffect, useRef } from "react";
import img from "../img/popcorn.png"
import img2 from "../img/guy+popcorn.png"
import img3 from "../img/popcorn2.png"


const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const featuredImages = [img, img2, img3]
    const slideRef = useRef();

    useEffect(() => {
        startSlider();
        slideRef.current.addEventListener("animationend", removeAnimation);
      },[]);    

    const startSlider = () => {
        setInterval(() => {
          handleOnNextClick();
        }, 5000);
    }

    const removeAnimation = () => {
        slideRef.current.classList.remove("fade-anim");
      };

    let count = 0;
    const handleOnNextClick = () => {
        count = (count + 1) % featuredImages.length;
        setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim");
    };


    return (
        <div ref={slideRef} className=" m-auto p-4 ">
          <img src={featuredImages[currentIndex]} alt="" className="w-full h-128 object-cover m-auto opacity-90 rounded-3xl shadow-gray shadow-around" />
        </div>
    )
}

export default Slider