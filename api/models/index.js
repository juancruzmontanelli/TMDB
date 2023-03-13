const User =require('./User')
const Favorite =require("./Favorite")



// es una realcion de muchos a muchos por que varios usuarios pueden tener la misma pelicula como favorita
// y varias peliculas pueden ser favoritas de un usario
// todas estas relaciones se hacen por la tabla  user_favorite
Favorite.belongsToMany(User, { through: "user_favorite"})
User.belongsToMany(Favorite, {through: "user_favorite"})


module.exports = {User, Favorite}