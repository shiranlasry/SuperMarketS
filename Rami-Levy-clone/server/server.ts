//server.ts

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import nodemailer from "nodemailer";

const multer = require("multer");

const storage = multer.memoryStorage(); // Use memory storage for handling files in memory
const upload = multer({ storage: storage });
dotenv.config();

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const port = process.env.PORT;
app.use(cookieParser());
app.use(express.json());

// Create a transporter object for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "fakeRamiLevy@gmail.com",
    pass: "zwcq hgxu sads fyts",
  },
});

// Endpoint to handle sending email
app.post("/api/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    // Create email options
    const mailOptions = {
      from: "fakeRamiLevy@gmail.com",
      to,
      subject,
      text,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

// Multer middleware for handling file uploads
app.use(upload.fields([{ name: "imagesProduct", maxCount: 2 }]));

import userRoutes from "./API/users/usersRoutes";
app.use("/api/users", userRoutes);

import addressesRoutes from "./API/addresses/addressesRoutes";
import cartsRoutes from "./API/carts/cartsRoutes";
import categoriesRoutes from "./API/categories/categoriesRoutes";
import citiesRoutes from "./API/cities/citiesRoutes";
import deliveries from "./API/deliveries/deliveriesRoutes";
import departmentsStatus from "./API/departmentsStatus/departmentsStatusRoutes";
import navbarRoutes from "./API/navbar/navbarRoutes";
import ordersRoutes from "./API/orders/ordersRoutes";
import productsDetailsRoutes from "./API/products/productsDetais/productsDetaisRoutes";
import productsImagesRoutes from "./API/products/productsImages/productsImagesRoutes";
import productsInventoriesRoutes from "./API/products/productsInventories/productsInventoriesRoutes";
import rolesRoutes from "./API/roles/rolesRoutes";
import sales from "./API/sales/salesRoutes";
import streetsRoutes from "./API/streets/streetsRoutes";
import usersContacts from "./API/usersContacts/usersContactsRoutes";
app.use("/api/roles", rolesRoutes);
app.use("/api/cities", citiesRoutes);
app.use("/api/streets", streetsRoutes);
app.use("/api/addresses", addressesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products-details", productsDetailsRoutes);
app.use("/api/products-inventories", productsInventoriesRoutes);
app.use("/api/products-images", productsImagesRoutes);
app.use("/api/navbar-items", navbarRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/deliveries", deliveries);
app.use("/api/departments-status", departmentsStatus);
app.use("/api/sales", sales);
app.use("/api/users-contacts", usersContacts);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
