import firebaseAdmin from "../../firebase-service";
import { NextFunction, Response, Request } from "express";

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ error: "Missing authorization header" });
    }

    const token = tokenHeader.split(" ")[1];
    firebaseAdmin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            console.error("Error verifying user token:", error);
            res.status(401).json({ error: "Invalid or expired token" });
        });
};
