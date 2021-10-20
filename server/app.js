const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Import all routes
const products = require("./routes/products");
const users = require("./routes/users");
const order = require("./routes/orders");

app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", order);

//Error Middleware to handle errors
app.use(errorMiddleware);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

module.exports = app;
