const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productsController");

const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

//Public routes
router.get("/products", getProducts);
router.get("/products/:id", getSingleProduct);

router.put("/review", isAuthenticated, createProductReview);
router.get("/reviews", isAuthenticated, getProductReviews);
router.delete("/reviews", isAuthenticated, deleteReview);

//Admin/Protected routes

router.get(
  "/admin/products",
  isAuthenticated,
  authorizeRoles("admin"),
  getAdminProducts
);

router.post(
  "/admin/products/new",
  isAuthenticated,
  authorizeRoles("admin"),
  createProduct
);

router.put(
  "/admin/products/update/:id",
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
