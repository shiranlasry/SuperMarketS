//server.ts 

import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage for handling files in memory
const upload = multer({ storage: storage });
dotenv.config();

const app = express();

const port = process.env.PORT;
app.use(cookieParser());
app.use(express.json());

// Multer middleware for handling file uploads
app.use(upload.fields([{ name: 'imagesProduct', maxCount: 2 }]));

import userRoutes from "./API/users/usersRoutes"
app.use("/api/users", userRoutes)

import citiesRoutes from "./API/cities/citiesRoutes"
app.use("/api/cities", citiesRoutes)
import streetsRoutes from "./API/streets/streetsRoutes"
app.use("/api/streets", streetsRoutes)
import addressesRoutes from "./API/addresses/addressesRoutes"
app.use("/api/addresses", addressesRoutes)
import categoriesRoutes from "./API/categories/categoriesRoutes"
app.use("/api/categories", categoriesRoutes)
import productsDetailsRoutes from "./API/products/productsDetais/productsDetaisRoutes"
app.use("/api/products-details", productsDetailsRoutes)
import productsInventoriesRoutes from "./API/products/productsInventories/productsInventoriesRoutes"
app.use("/api/products-inventories", productsInventoriesRoutes)
import productsImagesRoutes from "./API/products/productsImages/productsImagesRoutes"
app.use("/api/products-images", productsImagesRoutes)
import navbarRoutes from "./API/navbar/navbarRoutes"
app.use("/api/navbar-items", navbarRoutes)
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
