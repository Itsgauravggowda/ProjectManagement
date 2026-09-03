import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-errors.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Unauthorized request");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        

        const user = await User.findById(decodedToken._id)
            .select(
                "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
            );

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("JWT ERROR:", error);
        throw new ApiError(401, "Invalid access token");
    }
});