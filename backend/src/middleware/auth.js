import UserModel from "../models/user.model.js";
import { sendServerError } from "../utils/response.js";
import jwt from "jsonwebtoken";

export async function protect(req, res, next) {
    try {
        let token = req.cookies?.token || null;

        if (!token) {
            const authHeader = req.headers.authorization || "";
            token = authHeader.startsWith("Bearer ")
                ? authHeader.slice(7).trim()
                : authHeader || null;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login first"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login first"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return sendServerError(res);
    }
}

export function authorized(...roles) {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized. Please login first"
                });
            }

            const allowedRoles = roles.flat();
            const userRoles = Array.isArray(req.user.roles)
                ? req.user.roles
                : [req.user.role || req.user.roles].filter(Boolean);

            const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

            if (!hasAccess) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. You are not authorized"
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };
}