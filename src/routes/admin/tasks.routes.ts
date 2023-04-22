import { Router, Request as ExpressRequest, Response } from "express";
import { TaskService } from "../../services/taskService";
import { createTaskSchema, updateTaskSchema, taskSchema } from "../../types/task";
import { validateRequestBody, validateQueryParams } from "../../middlewares/dataValidation";
import Joi from "joi";
import { AdminTaskRepository } from "../../repositories/TaskRepository";
import { getCurrentAdmin, getCurrentUser } from "../../middlewares/auth";
import { UserDTO } from "../../types/user";

const router = Router();

const taskRepository = new AdminTaskRepository();
const taskService = new TaskService(taskRepository);

interface Request extends ExpressRequest {
    user?: UserDTO;
}

//ADMIN ROUTES

// GET - tasks
router.get("/", getCurrentAdmin, async (req: Request, res: Response) => {
    const filters = req.query;
    try {
        const result = await taskService.getAllTasks(filters);
        res.status(200).json({ tasks: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET - tasks/:id
router.get("/:id", getCurrentAdmin, async (req: Request, res: Response) => {
    try {
        const id = await validateQueryParams(Joi.number().required(), req.params.id);
        const result = await taskService.getTaskById(id);
        res.status(200).json({ tasks: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// POST - tasks
router.post("/", getCurrentAdmin, validateRequestBody(createTaskSchema), async (req: Request, res: Response) => {
    try {
        const params = { ...req.body, user: req.user?.id };
        const result = await taskService.createTask(params);
        res.status(200).json({ tasks: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// PATCH - tasks
router.patch("/:id", getCurrentAdmin, validateRequestBody(updateTaskSchema), async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await taskService.updateTask(id, req.body);
        res.status(200).json({ tasks: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - tasks
router.delete("/:id", getCurrentAdmin, async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await taskService.deleteTask(id);
        res.status(200).json({ tasks: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
