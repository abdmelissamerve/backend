import { Router, Request as ExpressRequest, Response } from "express";
import { UserTaskService } from "../../services/taskService";
import { createTaskSchema, updateTaskSchema, taskSchema } from "../../types/task";
import { validateRequestBody, validateQueryParams } from "../../middlewares/dataValidation";
import Joi from "joi";
import { UserTaskRepository } from "../../repositories/TaskRepository";
import { getCurrentUser } from "../../middlewares/auth";
import { UserDTO } from "../../types/user";

const router = Router();

const taskRepository = new UserTaskRepository();
const taskService = new UserTaskService(taskRepository);

interface Request extends ExpressRequest {
    user?: UserDTO;
}

//USER ROUTES
// GET - user tasks
router.get("/", getCurrentUser, async (req: Request, res: Response) => {
    try {
        const filters = { ...req.query, user: req.user!.id };
        const result = await taskService.getAllTasks(filters);
        res.status(200).json({ tasks: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET - tasks/:id
router.get("/:id", getCurrentUser, async (req: Request, res: Response) => {
    try {
        const id = await validateQueryParams(Joi.number().required(), req.params.id);
        const result = await taskService.getTaskById(id, req.user!.id);
        res.status(200).json({ tasks: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET - tasks by project
router.get("/byProject/:id", getCurrentUser, async (req: Request, res: Response) => {
    try {
        const projectId = await validateQueryParams(Joi.number().required(), req.params.id);
        const result = await taskService.getTasksByProjectId(projectId, req.user!.id);
        res.status(200).json({ tasks: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// POST - tasks
router.post("/", getCurrentUser, validateRequestBody(createTaskSchema), async (req: Request, res: Response) => {
    try {
        const params = { ...req.body, user: req.user!.id };
        const result = await taskService.createTask(params);
        res.status(200).json({ tasks: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// PATCH - tasks
router.patch("/:id", getCurrentUser, validateRequestBody(updateTaskSchema), async (req: Request, res: Response) => {
    try {
        const id = await validateQueryParams(Joi.number().required(), req.params.id);
        const task = await taskService.getTaskById(id, req.user!.id);
        if (!task) {
            throw new Error("No task found!");
        }
        const result = await taskService.updateTask(id, req.body);
        res.status(200).json({ tasks: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - tasks
router.delete("/:id", getCurrentUser, async (req: Request, res: Response) => {
    try {
        const id = await validateQueryParams(Joi.number().required(), req.params.id);
        const task = await taskService.getTaskById(id, req.user!.id);
        if (!task) {
            throw new Error("No task found!");
        }
        const result = await taskService.deleteTask(id);
        res.status(200).json({ tasks: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
