const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

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

//usar imagenes del servidor
app.use("/images", express.static(path.join(__dirname, "public/images")));

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({storage});
//ruta para subir imagenes
app.post("/social/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json({message : "File uploaded succesfully."})
  } catch (error) {
    console.log(error);
  }
});

app.use(authRoutes);
app.use(userRoutes);
app.use(postRoutes);

//Puesta en fucionamiento del servidor
app.listen(5000, () => {
  console.log("Backend server is running...");
});
