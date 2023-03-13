const {Sequelize, Model} = require("sequelize");
const db = require("../db");
const bcrypt = require('bcrypt')

// modelo de usuario
class User extends Model{
    // estas funciones sirven para hashear la password y para validar 
    hash(password, salt) {
        return bcrypt.hash(password, salt)
    }
    validatePassword(password) {
        return this.hash(password, this.salt)
        .then((hash) => hash === this.password)
    }
} 

User.init (
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false, 
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salt: {
            type: Sequelize.STRING
        },
 

    },{sequelize:db,modelName:"users"}
)

// antes de crear el usuario hashea la password
User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync()
    user.salt = salt 
    let password = user.password
    return user.hash(password, salt)
    .then((hashPassword) => user.password = hashPassword)
})

module.exports = User