import express from "express";
import {role} from "../../middlewares/role.js";
import {auth} from "../../middlewares/auth.js";
import {AuthController} from "./controller/AuthController.js";
import UserController from "../core/user/UserController.js";

const router = express.Router();

const authCtrl = new AuthController();

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

router.get("/test", authCtrl.test);

// Protected
router.get(
    "/users",
    auth,
    role("admin"),
    UserController.index
);


export default router;