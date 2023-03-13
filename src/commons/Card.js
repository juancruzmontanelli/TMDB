import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

// este comon sirve para cargar todas las peliculas
const Card = ({ data, type }) => {
  const { user, toggleAddFavorite, toggleDeleteFavorite, toggleFavorite } = useContext(UserContext);
  const url = useLocation().pathname;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    favorites();
  }, []);

  const favorites = () => {
    if (user[type]) {
   
      user[type].map((fav) => {
        if (fav.filmId == data.id) setIsFavorite(true);
      });
    }
  };

  const addFavorite = () => {
    if (!user.id) {
      toast.error(`You have to be logged`, {});
    } else {
      axios
        .post("/favorite/add", {
          id: user.id,
          content: {
            filmId: data.id,
            name: data.title ? data.title : data.name,
            vote: data.vote_average,
            date: data.release_date ? data.release_date : data.first_air_date,
            img:
              "https://www.themoviedb.org/t/p/w220_and_h330_face/" +
              data.poster_path,
            type: type,
          },
        })
        .then((favorite) => {
         toggleFavorite(user.id)
          setIsFavorite(true);

          toast.success(
            `You have add "${data.title ? data.title : data.name}" to favorite`,
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="text-yellow  "
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              ),
            }
          );
        });
    }
  };

  const deleteFavorite = () => {
    if (!user.id) return "you need to be logged";

    axios
      .get(`/favorite/${data.id}`)
      .then((res) => res.data)
      .then((fav) => {
       
        axios
        .delete(`/favorite/delete/${fav.id}`)
        .then((deleted) => setIsFavorite(false));
        toggleFavorite(user.id)
        toast.success(
          `You have delete "${
            data.title ? data.title : data.nama
          }" from favorite`,
          {
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
          }
          );
      
      });
  };
  return (
    <>
      <Link to={`single/${data.id}`}>
        <div className="">
          <figure className="">
            <img
              src={
                data.poster_path
                  ? "https://www.themoviedb.org/t/p/w220_and_h330_face/" +
                    data.poster_path
                  : "https://www.themoviedb.org/t/p/w220_and_h330_face/" +
                    data.img
              }
              alt="Placeholder image"
              className="w-full"
            />
          </figure>
        </div>
        <div className="flex justify-between my-2">
          <p className="text-xl font-bold">
            {data.title ? data.title : data.name}
          </p>
          <p className="border border-white p-2  w-10 rounded-full">
            {data.vote_average}
          </p>
        </div>
      </Link>
      {/* dependiendo la url es si se va a mostrar una estrellita o un tacho de basura */}
      <div className="flex justify-between my-2">
        <p>{data.release_date ? data.release_date : data.first_air_date}</p>
        {!isFavorite ? (
          <button
            className="border border-yellow rounded-xl py-2 px-4 bg-yellow text-black "
            onClick={addFavorite}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </button>
        ) : (
          <button
            className="border border-red rounded-xl py-2 px-4 self-center bg-red"
            onClick={() => deleteFavorite()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
        )}

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
    </>
  );
};

export default Card;
