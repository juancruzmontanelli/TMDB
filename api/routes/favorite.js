const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const User = require("../models/User");

// los que tengan "(pruebas)" son codigo para probar el funcionamiento de la api

// para obtener todas las peliculas favoritas (pruebas)
router.get("/", (req, res) => {
  Favorite.findAll()
    .then((favorite) => res.send(favorite))
    .catch();
});
// para obtener un tipo especifico de peliculas (pruebas)
router.get("/movies", (req, res) => {
  Favorite.findAll({ where: { type: "movie" } })
    .then((favorite) => res.send(favorite))
    .catch();
});

router.get('/:id', (req, res) => {
  const { id } = req.params
 console.log(id)
  Favorite.findOne({ where: {filmId : id }})
  .then((favorite) => res.send(favorite))
})

// para agregar una pelicula y setearle el usuario
router.post("/add", (req, res) => {
  const { id, content } = req.body;
  User.findByPk(id)
    .then((user) => {
      Favorite.create(content)
        .then((favorite) => {
          favorite.addUsers(user);
          res.send(favorite);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => res.send(err));
});

// router.post("/add", (req, res) => {
//   const { id, content } = req.body;
//   User.findByPk(id)
//     .then((user) => {
//       Favorite.findOne({ where: { id: content.id } })
//         .then((favorite) => {
//           if (!favorite) {

//             Favorite.create(content)
//               .then((favoriteCreate) => {
//                 favoriteCreate.addUsers(user);
//                 res.send(favoriteCreate);
//               })
//               .catch((err) => res.send(err));
//           } else {

//             res.send(favorite);
//           }
//         })
//         .catch((err) => res.send(err));
//     })
//     .catch((err) => res.send(err));
// });

// para eliminar una pelicula

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params)
      Favorite.destroy({ where: {id: id}}).then((del) => {
        console.log('enter')
        res.send('deleted')
      })
      .catch((err) => res.send(err));
  
});
module.exports = router;
