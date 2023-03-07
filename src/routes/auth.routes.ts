import { Router, Request, Response } from "express";
import UserService from "../services/userService";
import AuthenticationServices from "../services/authenticationService";
import { CreateUserDTO, UpdateUserDTO } from "../types/user";
import { RegisterInput } from "../types/authentication";


const router = Router();
const authenticationService = new AuthenticationServices();

// POST - /auth/login
router.post("/login", async (req: Request, res: Response) => {
//TODO: login
});


// POST - /auth/register
router.post("/register", async (req: Request, res: Response) => {
    let newUser = req.body as RegisterInput;
    console.log(newUser);
    try {
        const result = await authenticationService.register(newUser);
        res.status(200).json({ user: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

export default router;