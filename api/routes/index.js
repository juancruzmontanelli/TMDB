const express = require("express");

const router = express.Router();
const users = require("./users");
const favorite = require("./favorite");

// importamos las rutas 
router.use("/users" , users)
router.use('/favorite', favorite)

module.exports = router ;