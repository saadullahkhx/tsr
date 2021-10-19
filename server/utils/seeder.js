const Product = require("../models/productModel");
const dotenv = require("dotenv");
const connectDb = require("../config/connectDb");

const products = require("../data/products.json");

// Setting env file.
dotenv.config({ path: "server/config/config.env" });

//Connect DB.

const seedProducts = async () => {
  await connectDb();
  try {
    await Product.deleteMany();
    console.log("Products are deleted.");

    await Product.insertMany(products);
    console.log("All products are added.");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
