const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);

router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticated, updatePassword);
router.put("/me/update", isAuthenticated, updateProfile);

router.get("/logout", logoutUser);
router.get("/me", isAuthenticated, getUserProfile);

router.get(
  "/admin/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

router.get(
  "/admin/users/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserDetails
);

router.put(
  "/admin/user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUser
);

router.delete(
  "/admin/user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;
