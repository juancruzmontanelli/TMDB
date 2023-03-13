import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router";
import { Toaster, toast } from "react-hot-toast";

// este common muestra los detalles de la pelicula
const Details = () => {
  const [detail, setDetail] = useState({});
  const { type, id } = useParams();
  const { user, toggleFavorite } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const favorites = (data) => {
    if (user[type]) {
      user[type].map((fav) => {
        if (fav.filmId == data.id) setIsFavorite(true);
      });
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=2ce885ac9679e4394c7fbf74b3361710&language=en-US`
      )
      .then((movieDetails) => {
        setDetail(movieDetails.data);
        favorites(movieDetails.data);
      });
  }, []);

  let rate = String(detail.vote_average).slice(0, 3);
  const fixRate = (vote) => {
    if (!vote.includes(".")) {
      if (vote == 10) {
        Number(vote);
      } else {
        vote = vote + ".0";
        Number(vote);
      }
      rate = vote;
    }
  };
  fixRate(rate);

  const addFavorite = () => {
    if (!user.id) {
      toast.error(`You have to be logged`, {});
    } else {
      axios
        .post("/favorite/add", {
          id: user.id,
          content: {
            filmId: detail.id,
            name: detail.title ? detail.title : detail.name,
            vote: detail.vote_average,
            date: detail.release_date
              ? detail.release_date
              : detail.first_air_date,
            img:
              "https://www.themoviedb.org/t/p/w220_and_h330_face/" +
              detail.poster_path,
            type: type,
          },
        })
        .then((favorite) => {
          toggleFavorite(user.id);
          setIsFavorite(true);

          toast.success(
            `You have add "${
              detail.title ? detail.title : detail.name
            }" to favorite`,
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
      .get(`/favorite/${detail.id}`)
      .then((res) => res.data)
      .then((fav) => {
        axios
          .delete(`/favorite/delete/${fav.id}`)
          .then((deleted) => setIsFavorite(false));
        toggleFavorite(user.id);
        toast.success(
          `You have delete "${
            detail.title ? detail.title : detail.nama
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
    <div className="p-6">
      <p className="text-2xl font-bold text-center underline"> Details</p>
      <div className="py-6 px-20 flex my-6 shadow-black shadow-big-around bg-neutral-700">
        <img
          src={
            "https://www.themoviedb.org/t/p/w220_and_h330_face/" +
            detail.poster_path
          }
          alt="Placeholder image"
          className=" w-1/3 h-full"
        />
        <div className="flex flex-col w-full">
          <div className="mx-6">
            <div className="flex justify-between">
              <div className="flex">
                <h2 className="text-4xl font-bold">
                  {detail.title ? detail.title : detail.name}
                </h2>
                {!isFavorite ? (
                  <button
                    className="border border-yellow rounded-xl py-2 mx-2 px-4 bg-yellow text-black "
                    onClick={addFavorite}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    className="border border-red rounded-xl py-2 px-4 mx-2 self-center bg-red"
                    onClick={() => deleteFavorite()}
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
                )}
              </div>

              <h4 className="border border-white w-10 h-10 rounded-full p-2">
                {rate}
              </h4>
            </div>
            <div className="flex my-2">
              <h4 className="text-xl mr-2">
                {detail.release_date
                  ? detail.release_date
                  : detail.first_air_date}
              </h4>
              <h4 className="text-x mr-2">/</h4>
              <h4 className="text-xl mr-2">
                {" "}
                Original Language: {detail.original_language}
              </h4>
            </div>

            <h3 className="text-xl font-bold">Genres :</h3>
            <div className="flex my-2">
              {detail.genres
                ? detail.genres.map((genres) => (
                    <p className="mr-6 border border-white rounded-md p-2">
                      {genres.name}
                    </p>
                  ))
                : ""}
            </div>
            <h3 className="text-xl font-bold">companies :</h3>

            <div className="flex my-2">
              {detail.production_companies
                ? detail.production_companies.map((companies) => (
                    <p className="mr-6 border border-white rounded-md p-2">
                      {companies.name}
                    </p>
                  ))
                : ""}
            </div>
          </div>
          <div className="m-6">
            <h3 className="text-2xl font-bold my-2">Overview :</h3>
            <text className="text-2xl">{detail.overview}</text>
          </div>{" "}
        </div>
      </div>
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

export default Details;
