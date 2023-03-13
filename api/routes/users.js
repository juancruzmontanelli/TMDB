const express = require("express");
const { generateToken, validateToken } = require("../config/toknes");
const Favorite = require("../models/Favorite");
const router = express.Router();
const User = require("../models/User");

// para obtener un usuario en especifico
router.get("/user/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      // payload para no mandar informacion sensible o inecesaria
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      res.send(payload);
    })
    .catch();
});

// para obtener los favoritos y el tipo especifico de favoritos
router.get("/favorites/:type/:id", (req, res) => {
  const { id, type } = req.params;
  console.log(id);
  User.findByPk(id, {
    include: {
      model: Favorite,
      where: { type },
    },
  })

    .then((user) => {
      if (user) res.send(user.favorites);
      else res.send([]);
    })
    .catch();
});

// para obtener todos los usuarios
router.get("/", (req, res) => {
  User.findAll()
    .then((users) => {
      const usersPayload = [];
      users.map((user) => {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        usersPayload.push(payload);
      });
      res.send(usersPayload);
    })
    .catch();
});

// para mantener loggeado a un usuario
router.get("/me", (req, res) => {
  const token = req.cookies.token;

  const { user } = validateToken(token);

  res.send(user);
});

// para registrar un usuario nuevo
router.post("/register", (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch();
});

// para loggear un usuario
router.post("/login", (req, res) => {
  const { password, email } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) return res.sendStatus(401);
      user.validatePassword(password).then((valido) => {
        if (!valido) return res.sendStatus(401);
        user.getFavorites().then((favorites) => {
          let tv = [];
          let movies = [];
          favorites.map((favorite) => {
            if (favorite.type == "tv") tv.push(favorite);
            if (favorite.type == "movie") movies.push(favorite);
          });
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            tv: tv,
            movies: movies,
          };

          const token = generateToken(payload);

          res.cookie("token", token);

          res.send(payload);
        });
      });
    })
    .catch();
});

module.exports = router;
