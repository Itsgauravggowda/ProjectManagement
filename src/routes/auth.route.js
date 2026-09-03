import { Router } from "express";
import { registerUser, login } from "../controllers/auth-controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userLoginValidator, userRegistrationValidator } from "../validators/index-validators.js";

const router = Router();

router.route("/register").post(userRegistrationValidator(),validate,registerUser);
router.route("/login").post(userLoginValidator(),validate,login);


export default router;
