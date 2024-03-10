//server.ts 

import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import session from 'express-session';

const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage for handling files in memory
const upload = multer({ storage: storage });
dotenv.config();

const app = express();

app.use(session
  ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

const port = process.env.PORT;
app.use(cookieParser());
app.use(express.json());

// Multer middleware for handling file uploads
app.use(upload.fields([{ name: 'imagesProduct', maxCount: 2 }]));


import userRoutes from "./API/users/usersRoutes"
app.use("/api/users", userRoutes)

import rolesRoutes from "./API/roles/rolesRoutes"
app.use("/api/roles", rolesRoutes)
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
import listsRoutes from "./API/lists/listsRoutes"
app.use("/api/lists", listsRoutes)
import cartsRoutes from "./API/carts/cartsRoutes"
app.use("/api/carts", cartsRoutes)
import ordersRoutes from "./API/orders/ordersRoutes"
app.use("/api/orders", ordersRoutes)
import deliveries from "./API/deliveries/deliveriesRoutes"
app.use("/api/deliveries", deliveries)
import status from "./API/status/statusRoutes"
app.use("/api/status", status)
import departmentsStatus from "./API/departmentsStatus/departmentsStatusRoutes"
app.use("/api/departments-status", departmentsStatus)
import sales from "./API/sales/salesRoutes"
app.use("/api/sales", sales)
import usersContacts from "./API/usersContacts/usersContactsRoutes"
app.use("/api/users-contacts", usersContacts)


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});


