import { Router } from "express";
import { registerUser, login, logout, getCurrentUser,verifyEmail,resendEmailVerification,refreshAccessToken,forgotPasswordRequest,changeCurrentPassword,resetForgotPassword, } from "../controllers/auth-controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userLoginValidator, userRegistrationValidator, userChangeCurrentPasswordValidator,userForgotPasswordValidator,userResetForgotPasswordValidator, } from "../validators/index-validators.js";
import { verifyJWT } from "../middlewares/auth.middlewar.js";
const router = Router();



// unsecured route
router.route("/register").post(userRegistrationValidator(),validate,registerUser);
router.route("/login").post(userLoginValidator(),validate,login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);


router
  .route("/reset-password/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgotPassword);



//secure routes
router.route("/logout").post(verifyJWT,logout);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword,
  );
router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification); 

export default router;
