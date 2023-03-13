import React from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useContext, useEffect, useState, useReducer } from "react";
import { UserContext } from "../context/UserContext";
import SimpleCard from "../commons/SimpleCard";
import { useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const SimpleCarousel = ({ date, type }) => {
  const url = useLocation().pathname;
  const { user, toggleFavorite } = useContext(UserContext);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  let [arr, setArr] = useState([]);

  useEffect(() => {
    if (url.includes(`user/${user.id}`)) {
      axios.get(`/users/favorites/${type}/${user.id}`).then((favorite) => {
        setArr(favorite.data);
        console.log(arr);
      });
    }
  }, [reducerValue]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    desktop2: {
      breakpoint: { max: 1400, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const deleteFavorite = (data) => {
    if (!user.id) return "you need to be logged";
    axios.delete(`/favorite/delete/${data.id}`).then((deleted) => deleted);
    toggleFavorite(user.id);
    toast.success(`You have delete "${data.name}" from favorite`, {
      icon: (
        <div className="bg-red p-2 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className=""
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </div>
      ),
    });
    forceUpdate();
  };

  return (
    <div>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        className="py-2"
      >
        {url.includes("user") && !url.includes("users")
          ? arr.map((data, i) => (
              <div
                id={i}
                className="p-4 shadow-black shadow-around my-4 mx-2  flex flex-col bg-neutral-700"
              >
                <SimpleCard data={data} type={type} />
                <button
                  className="border border-red rounded-xl py-2 px-4 my-2 self-center bg-red"
                  onClick={() => deleteFavorite(data)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </div>
            ))
          : date.map((data, i) => (
              <div
                id={i}
                className="p-4 shadow-black shadow-around my-4 mx-2  flex flex-col bg-neutral-700"
              >
                <SimpleCard data={data} type={type} />
              </div>
            ))}
      </Carousel>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default SimpleCarousel;
