import firebaseAdmin from "../../firebase-service";
import { NextFunction, Response, Request as ExpressRequest } from "express";
import UserService from "../services/userService";
import { UserDTO } from "../types/user";

const userService = new UserService();

interface Request extends ExpressRequest {
    user?: UserDTO;
}

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ error: "Not authorized" });
    }
    try {
        const token = tokenHeader.split(" ")[1];
        const firebaseUser = await firebaseAdmin.auth().verifyIdToken(token);
        const dbUser = await userService.getByEmail(firebaseUser.email || "");
        if (!dbUser) {
            return res.status(401).json({ error: "Not authorized" });
        }
        req.user = dbUser;
        next();
    } catch (error) {
        console.error("Error verifying user token:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//TODO: add a middleware to check if user is admin
