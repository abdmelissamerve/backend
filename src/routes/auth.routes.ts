import { Router, Request, Response } from "express";
import AuthenticationServices from "../services/authenticationService";
import { registerSchema } from "../types/authentication";
import { validateReqBody } from "../middlewares/dataValidation";

const router = Router();
const authenticationService = new AuthenticationServices();

// POST - /auth/login
router.post("/login", async (req: Request, res: Response) => {
    //TODO: login
});

// POST - /auth/register
router.post("/register", validateReqBody(registerSchema), async (req: Request, res: Response) => {
    try {
        const result = await authenticationService.register(req.body);
        res.status(200).json({ user: result });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

export default router;
