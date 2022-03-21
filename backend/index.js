const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

//Rutas
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

//Hacer uso de dotenv
dotenv.config();

//Conectar a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/social",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Conected to MongoDB");
  }
);

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(authRoutes);
app.use(userRoutes);
app.use(postRoutes);

//Puesta en fucionamiento del servidor
app.listen(5000, () => {
  console.log("Backend server is running...");
});
