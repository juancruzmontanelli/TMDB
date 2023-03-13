// Configuración del server
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const models = require('./models')
const morgan = require('morgan')
const db = require("./db");
const api = require("./routes");

app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser())
app.use("/", api);


const PORT = process.env.PORT || 3001;

db.sync({ force: false}).then(() => {
  console.log("Db connected");
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});
