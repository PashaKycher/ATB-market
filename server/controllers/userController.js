import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import dotenv from "dotenv";
dotenv.config();
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageClodinery.js";
import generatedOtp from "../utils/generatedOtp.js";
import forgetPasswordTemplate from "../utils/forgetPasswordTemplate.js";
import jwt from "jsonwebtoken";

// register user
export async function registerUserController(req, res) {
    try {
        // get data from body from client
        const { name, email, password } = req.body;
        // check if data is valid
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Provide name, email and password",
                succsess: false,
                error: true
            });
        }
        // check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                succsess: false,
                error: true
            });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create payload
        const payload = {
            name,
            email,
            password: hashedPassword
        };
        // create user
        const newUser = new UserModel(payload);
        const save = await newUser.save();
        // verify email
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify your email",
            html: verifyEmailTemplate({ name, url: verifyEmailUrl })
        })
        return res.status(201).json({
            message: "User created successfully",
            succsess: true,
            error: false,
            data: save
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// verify email
export async function verifyEmailController(req, res) {
    try {
        // get code from query, code this is the id of the user
        const { code } = req.body;
        const user = await UserModel.findone({ _id: code });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        const updateUser = await UserModel.updateOne({ _id: code }, { verify_email: true });
        return res.status(200).json({
            message: "User verified successfully",
            succsess: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// login user
export async function loginUserController(req, res) {
    try {
        // get data from body from client
        const { email, password } = req.body;
        // check if data is valid
        if (!email || !password) {
            return res.status(400).json({
                message: "Provide email and password",
                succsess: false,
                error: true
            });
        }
        // check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // check user statys
        if (user.status !== "Active") {
            return res.status(400).json({
                message: "Contact admin for more information",
                succsess: false,
                error: true
            })
        }
        // check if password is correct
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "Password is incorrect",
                succsess: false,
                error: true
            });
        }
        // token access
        const accessToken = await generatedAccessToken(user._id);
        // token refresh
        const refreshToken = await generatedRefreshToken(user._id);
        // update user last login 
        const updateUser = await UserModel.updateOne({ _id: user?._id }, { last_login_date: new Date() });
        // cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        // set cookie
        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);
        // return response
        return res.status(200).json({
            message: "User login in successfully",
            succsess: true,
            error: false,
            data: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// get login user ditails
export async function getLoginUserDitailsController(req, res) {
    try {
        const userId = req.userId; // middleware (auth.js)
        const user = await UserModel.findById(userId).select("-password -refresh_token");
        return res.status(200).json({
            message: "User ditails get successfully",
            succsess: true,
            error: false,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// logout user
export async function logoutUserController(req, res) {
    try {
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // remove token
        const removeRefreshToken = await UserModel.updateOne({ _id: userId }, { refresh_token: "" });
        // cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        // clear cookie
        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);
        // return response
        return res.status(200).json({
            message: "User logout successfully",
            succsess: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// upload user avatar
export async function uploadAvatarController(req, res) {
    try {
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // get image from request
        const image = req.file; // midedleware (multer.js)
        // upload image to cloudinary
        const uploadImage = await uploadImageCloudinary(image);
        // update user
        const updateUser = await UserModel.updateOne({ _id: userId }, { avatar: uploadImage.url });
        // return response
        return res.status(200).json({
            message: "User avatar uploaded successfully",
            succsess: true,
            error: false,
            data: {
                _id: userId,
                avatar: uploadImage.url
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// update user details
export async function updateUserDetailsController(req, res) {
    try {
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // get data from request
        const { name, email, password, mobile } = req.body;
        // check if userId valid
        if (!userId) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        let hashedPassword = "";
        if (password) {
            // hash password
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }
        // update user
        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(password && { password: hashedPassword }),
            ...(mobile && { mobile: mobile })
        });
        // return response
        return res.status(200).json({
            message: "User details updated successfully",
            succsess: true,
            error: false,
            data: updateUser
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// forget password
export async function forgetPasswordController(req, res) {
    try {
        // get email from request
        const { email } = req.body;
        // check if email exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // generate otp from utils
        const otp = generatedOtp();
        // expire time
        const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1h
        console.log(expireTime)
        // update user
        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: expireTime
        });
        // send email
        await sendEmail({
            sendTo: user.email,
            subject: "Reset Password",
            html: forgetPasswordTemplate({ name: user.name, otp: otp })
        });
        // return response
        return res.status(200).json({
            message: "Email sent successfully",
            succsess: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// verify forget password otp
export async function verifyForgetPasswordOtpController(req, res) {
    try {
        // get otp from request
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                message: "Provide email and otp",
                succsess: false,
                error: true
            });
        }
        // check if email exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid otp",
                succsess: false,
                error: true
            });
        }
        // check current time
        const currentTime = new Date();
        if (user.forgot_password_expiry < currentTime) {
            return res.status(400).json({
                message: "Otp expired",
                succsess: false,
                error: true
            });
        }
        // check if otp is valid
        if (user.forgot_password_otp !== otp) {
            return res.status(400).json({
                message: "Invalid otp",
                succsess: false,
                error: true
            });
        }
        const updateUser = await UserModel.updateOne({ _id: user._id }, { forgot_password_otp: "", forgot_password_expiry: "" });
        // return response
        return res.status(200).json({
            message: "Otp verified successfully",
            succsess: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// reset password
export async function resetPasswordController(req, res) {
    try {
        // get data from request
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({
                message: "Provide email, new password",
                succsess: false,
                error: true
            });
        }
        // check if email exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // update user
        const updateUser = await UserModel.updateOne({ _id: user._id }, { password: hashedPassword });
        // return response
        return res.status(200).json({
            message: "Password reset successfully",
            succsess: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// refresh token
export async function refreshTokenController(req, res) {
    try {
        // get refresh token from cookie
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];
        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorized token",
                succsess: false,
                error: true
            });
        }
        // verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        // check if decoded is valid
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized token",
                succsess: false,
                error: true
            });
        }
        // check if user exists
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized token",
                succsess: false,
                error: true
            });
        }
        // generate new access token
        const accessToken = await generatedAccessToken(user._id);
        // cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        // send access token to client in cookie
        res.cookie("accessToken", accessToken, cookieOptions);
        // update user access token
        const updateUser = await UserModel.updateOne({ _id: user._id }, { access_token: accessToken });
        // return response
        return res.status(200).json({
            message: "Token refreshed successfully",
            succsess: true,
            error: false,
            data: { "accessToken": accessToken }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}