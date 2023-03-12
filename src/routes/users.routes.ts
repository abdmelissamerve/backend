import { Router, Request, Response } from "express";
import UserService from "../services/userService";
import { createUserSchema, updateUserSchema, userSchema } from "../types/user";
import { validateReqBody, validateQueryParams } from "../middlewares/dataValidation";
import Joi from "joi";

const router = Router();
const userService = new UserService();

// GET - users
router.get("/", async (req: Request, res: Response) => {
    const filters = req.query;
    try {
        const result = await userService.getAll(filters);
        res.status(200).json({ users: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET - users/:id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = await validateQueryParams(Joi.number().required(), req.params.id);
        const result = await userService.getById(id);
        res.status(200).json({ user: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// POST - users
router.post("/", validateReqBody(createUserSchema), async (req: Request, res: Response) => {
    try {
        const result = await userService.create(req.body);
        res.status(200).json({ user: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// PATCH - users
router.patch("/:id", validateReqBody(updateUserSchema), async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await userService.update(id, req.body);
        res.status(200).json({ user: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - users
router.delete("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await userService.delete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
