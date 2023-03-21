import { Router, Request as ExpressRequest, Response, RequestHandler, NextFunction } from "express";
import UserService from "../../services/userService";
import { getCurrentUser } from "../../middlewares/auth";
import { UserDTO } from "../../types/user";

const router = Router();
const userService = new UserService();

interface Request extends ExpressRequest {
    user?: UserDTO;
}

// GET - /profile
router.get("/profile", getCurrentUser, async (req: Request, res: Response) => {
    try {
        const user = req.user as UserDTO;
        //TODO: restrict what information can user receive using a dto
        res.status(200).json({ user: user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// TODO - add patch route to update current user profile
// PATCH - /profile
router.patch("/profile", getCurrentUser, async (req: Request, res: Response) => {});

export default router;
