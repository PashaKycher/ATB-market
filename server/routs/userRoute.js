import { Router } from "express";
import {
        forgetPasswordController, getLoginUserDitailsController, loginUserController, logoutUserController,
        refreshTokenController, registerUserController, resetPasswordController, updateUserDetailsController,
        uploadAvatarController, verifyEmailController, verifyForgetPasswordOtpController
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController)
userRouter.post("/verify-email", verifyEmailController)
userRouter.post("/login", loginUserController)
userRouter.get("/user-ditails", auth, getLoginUserDitailsController)
userRouter.get("/logout", auth, logoutUserController)
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatarController)
userRouter.put("/update-user", auth, updateUserDetailsController)
userRouter.put("/forget-password", forgetPasswordController)
userRouter.put("/verify-forget-password-otp", verifyForgetPasswordOtpController)
userRouter.put("/reset-password", resetPasswordController)
userRouter.post("/refresh-token", refreshTokenController)

export default userRouter