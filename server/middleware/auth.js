import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
    try {
        // get token from cookie
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];
        // check if token is valid
        if (!token) {
            return res.status(401).json({
                message: "You have not login",
                succsess: false,
                error: true
            });
        }
        // decode token
        const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        // check if decoded is valid
        if (!decoded) {
            return res.status(401).json({
                message: "You have not login",
                succsess: false,
                error: true
            });
        }
        // add userId to request object
        req.userId = decoded.id;
        // continue
        next();
    } catch (error) {
        return res.status(500).json({
            message: "You have not login", //error.message || error,
            succsess: false,
            error: true
        });
    }
}

export default auth