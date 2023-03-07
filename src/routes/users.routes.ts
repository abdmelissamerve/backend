import { Router, Request, Response } from "express";
import UserService from "../services/userService";
import { CreateUserDTO, UpdateUserDTO } from "../types/user";

const router = Router();
const userService = new UserService();

// GET - users
router.get("/", async (req: Request, res: Response) => {
    const filters = req.query;
    try {
        const result = await userService.getAll(filters);
        res.status(200).json({ users: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET - users/:id
router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await userService.getById(id);
        res.status(200).json({ user: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// POST - users
router.post("/", async (req: Request, res: Response) => {
    let newUser = req.body as CreateUserDTO;
    try {
        const result = await userService.create(newUser);
        res.status(200).json({ user: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// PATCH - users
router.patch("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updatedUser = req.body as UpdateUserDTO;
    try {
        const result = await userService.update(id, updatedUser);
        res.status(200).json({ user: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// DELETE - users
router.delete("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await userService.delete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;
