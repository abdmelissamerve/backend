import { Router, Request as ExpressRequest, Response } from "express";
import AuthenticationServices from "../../services/authenticationService";
import { registerSchema } from "../../types/authentication";
import { validateRequestBody } from "../../middlewares/dataValidation";
import { UserDTO } from "../../types/user";
import PhoneVerificationService from "../../services/phoneVerificationService";
import { getCurrentUser } from "../../middlewares/auth";

const router = Router();
const authenticationService = new AuthenticationServices();
const phoneVerificationService = new PhoneVerificationService();

interface Request extends ExpressRequest {
    user?: UserDTO;
}

// POST - /auth/register
router.post("/register", validateRequestBody(registerSchema), async (req: Request, res: Response) => {
    try {
        const result = await authenticationService.register(req.body);
        //Only return data that is safe to expose to the client
        const user = {
            id: result.id,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            phoneNumber: result.phoneNumber,
            role: result.role,
            isPhoneVerified: result.isPhoneVerified,
        } as UserDTO;
        res.status(200).json({ user: user });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

// POST - /auth/sendVerificationCode
router.post("/sendVerificationCode", getCurrentUser, async (req: Request, res: Response) => {
    try {
        const users = req.user as UserDTO;
        const result = await phoneVerificationService.sendCode(users.id, users.phoneNumber || "");
        res.status(200).json({ result: result });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

// POST - /auth/verifyCode
router.post("/verifyCode", getCurrentUser, async (req: Request, res: Response) => {
    try {
        const users = req.user as UserDTO;
        const result = await phoneVerificationService.verifyCode(users.id, req.body.code);
        res.status(200).json({ result: result });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

export default router;
