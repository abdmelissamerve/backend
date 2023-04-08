import { Router, Request as ExpressRequest, Response, RequestHandler, NextFunction } from "express";
import { UserService } from "../../services/userService";
import { getCurrentUser } from "../../middlewares/auth";
import { UserDTO } from "../../types/user";
import { UserRepository } from "../../repositories/UserRepository";

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

interface Request extends ExpressRequest {
    user?: UserDTO;
}

// GET - /profile
router.get("/profile", getCurrentUser, async (req: Request, res: Response) => {
    try {
        //Only return data that is safe to expose to the client
        const user = {
            id: req.user?.id,
            email: req.user?.email,
            firstName: req.user?.firstName,
            lastName: req.user?.lastName,
            phoneNumber: req.user?.phoneNumber,
            role: req.user?.role,
            isPhoneVerified: req.user?.isPhoneVerified,
            isEmailVerified: req.user?.isEmailVerified,
        } as UserDTO;
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
