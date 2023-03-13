const {Sequelize, Model} = require("sequelize");
const db = require("../db");
const bcrypt = require('bcrypt')

// modelo de las peliculas favoritas de cada usuario
class Favorite extends Model{} 

Favorite.init (
    {
        filmId: {
            type: Sequelize.INTEGER, 
            allowNull:false
            
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vote: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false
        },
        img: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        }

    },{sequelize:db,modelName:"favorite"}
)

module.exports = Favorite