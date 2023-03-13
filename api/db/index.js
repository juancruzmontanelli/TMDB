// base de datos
const Sequelize = require('sequelize');
const db = new Sequelize('tmdb_db', null, null, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});



module.exports=db