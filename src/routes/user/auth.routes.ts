import { Router, Request, Response } from "express";
import AuthenticationServices from "../../services/authenticationService";
import { registerSchema } from "../../types/authentication";
import { validateRequestBody } from "../../middlewares/dataValidation";

const router = Router();
const authenticationService = new AuthenticationServices();

// POST - /auth/register
router.post("/register", validateRequestBody(registerSchema), async (req: Request, res: Response) => {
    try {
        const result = await authenticationService.register(req.body);
        res.status(200).json({ user: result });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

export default router;
