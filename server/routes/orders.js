const express = require("express");

const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  unAuthenticatedOrder,
  updateOrder,
  deleteOrder,
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

router.put(
  "/admin/order/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateOrder
);

router.delete(
  "/admin/order/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteOrder
);

module.exports = router;
