import { Router, Request as ExpressRequest, Response } from "express";
import UserService from "../../services/userService";
import { authenticateToken } from "../../middlewares/auth";
import { UserDTO } from "../../types/user";

const router = Router();
const userService = new UserService();

interface Request extends ExpressRequest {
    user?: UserDTO;
}

// GET - /profile
router.get("/profile", authenticateToken, async (req: Request, res: Response) => {
    try {
        const email = req.user?.email || "";
        const userProfile = await userService.getByEmail(email);
        res.status(200).json({ user: userProfile });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
