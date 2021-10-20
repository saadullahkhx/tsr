const app = require("./app");
// const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const cloudinary = require("cloudinary").v2;

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down server due to uncaught exceptions.");
  process.exit(1);
});

// Setting up config file
if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "server/config/config.env" });

// Connect to database
connectDb();

//Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

// Handle unhandled promise rejections.
process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Server shutting down...");
  server.close(() => process.exit(1));
});
