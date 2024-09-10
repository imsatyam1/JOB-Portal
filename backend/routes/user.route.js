import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controllers.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/mutler.js";

const router = express.Router();

router.route("/register").post  (upload, register);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated, upload, updateProfile);

export default router;  