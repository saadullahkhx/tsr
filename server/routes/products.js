const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

//Public routes
router.get("/products", getProducts);
router.get("/products/:id", getSingleProduct);

//Admin/Protected routes
router.post(
  "/admin/products/new",
  isAuthenticated,
  authorizeRoles("admin"),
  createProduct
);

router.put(
  "/admin/products/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateProduct
);

router.delete(
  "/admin/products/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteProduct
);

module.exports = router;
