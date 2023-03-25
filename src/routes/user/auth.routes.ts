import { Router, Request, Response } from "express";
import AuthenticationServices from "../../services/authenticationService";
import { registerSchema } from "../../types/authentication";
import { validateRequestBody } from "../../middlewares/dataValidation";
import { UserDTO } from "../../types/user";

const router = Router();
const authenticationService = new AuthenticationServices();

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
        } as UserDTO;
        res.status(200).json({ user: user });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

export default router;
