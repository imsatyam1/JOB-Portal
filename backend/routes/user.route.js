import express from "express";
import { login, logout, register, updateProfile, dummy } from "../controllers/user.controllers.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/mutler.js";

const router = express.Router();

router.route("/register").post  (singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/test").post(isAuthenticated, dummy);

export default router;  