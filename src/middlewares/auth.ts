import firebaseAdmin from "../../firebase-service";
import { NextFunction, Response, Request as ExpressRequest } from "express";
import { UserService } from "../services/userService";
import { UserDTO } from "../types/user";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

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
        const dbUser = await userService.getUserByEmail(firebaseUser.email || "");
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

// Middleware to check if the users is an admin
export const getCurrentAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ error: "Not authorized" });
    }
    try {
        const token = tokenHeader.split(" ")[1];
        const firebaseUser = await firebaseAdmin.auth().verifyIdToken(token);
        const dbUser = await userService.getUserByEmail(firebaseUser.email || "");
        if (!dbUser) {
            return res.status(401).json({ error: "Not authorized" });
        }
        if (dbUser.role !== "admin") {
            return res.status(403).json({ error: "Not enough permissions" });
        }
        req.user = dbUser;
        next();
    } catch (error) {
        console.error("Error verifying users token:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
