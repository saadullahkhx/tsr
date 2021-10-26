const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());

//Import all routes
const products = require("./routes/products");
const users = require("./routes/users");
const order = require("./routes/orders");

app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", order);

//Error Middleware to handle errors
app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

module.exports = app;
