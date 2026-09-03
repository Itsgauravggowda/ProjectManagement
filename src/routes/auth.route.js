import { Router } from "express";
import { registerUser, login, logout } from "../controllers/auth-controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userLoginValidator, userRegistrationValidator } from "../validators/index-validators.js";
import { verifyJWT } from "../middlewares/auth.middlewar.js";
const router = Router();

router.route("/register").post(userRegistrationValidator(),validate,registerUser);
router.route("/login").post(userLoginValidator(),validate,login);
router.route("/logout").post(verifyJWT,logout);


export default router;
