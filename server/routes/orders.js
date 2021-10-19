const express = require("express");

const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  unAuthenticatedOrder,
} = require("../controllers/ordersController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.post("/order/unauthenticated/new", unAuthenticatedOrder);
router.post("/order/new", isAuthenticated, newOrder);
router.get("/order/:id", isAuthenticated, getSingleOrder);
router.get("/orders/me", isAuthenticated, myOrders);

router.get(
  "/admin/orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

module.exports = router;
