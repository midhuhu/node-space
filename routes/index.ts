import express from "express";
import { userController } from "../controller";
const router = express.Router();

router.get("/login", userController.login);

export default router;
