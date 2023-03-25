import { Router, Request, Response } from "express";
import { UserService } from "../../services/userService";
import { createUserSchema, updateUserSchema, userSchema } from "../../types/user";
import { validateRequestBody, validateQueryParams } from "../../middlewares/dataValidation";
import Joi from "joi";
import { UserRepository } from "../../repositories/UserRepository";
import { getCurrentAdmin } from "../../middlewares/auth";

//Routes protected by admin middleware
const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

// GET - users
router.get("/", getCurrentAdmin, async (req: Request, res: Response) => {
    const filters = req.query;
    try {
        const result = await userService.getAllUsers(filters);
        res.status(200).json({ users: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET - users/:id
router.get("/:id", getCurrentAdmin, async (req: Request, res: Response) => {
    try {
        const id = await validateQueryParams(Joi.number().required(), req.params.id);
        const result = await userService.getUserById(id);
        res.status(200).json({ user: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// POST - users
router.post("/", getCurrentAdmin, validateRequestBody(createUserSchema), async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body);
        res.status(200).json({ user: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// PATCH - users
router.patch("/:id", getCurrentAdmin, validateRequestBody(updateUserSchema), async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await userService.updateUser(id, req.body);
        res.status(200).json({ user: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - users
router.delete("/:id", getCurrentAdmin, async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await userService.deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
