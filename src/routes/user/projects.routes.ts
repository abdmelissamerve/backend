import { Router, Request as ExpressRequest, Response } from "express";
import { UserProjectService } from "../../services/projectService";
import { createProjectSchema, updateProjectSchema } from "../../types/project";
import { validateRequestBody, validateQueryParams } from "../../middlewares/dataValidation";
import Joi from "joi";
import { UserProjectRepository } from "../../repositories/ProjectRepository";
import { getCurrentUser } from "../../middlewares/auth";
import { UserDTO } from "../../types/user";
import { UserTaskRepository } from "../../repositories/TaskRepository";

const router = Router();

const projectRepository = new UserProjectRepository();

const projectService = new UserProjectService(projectRepository);

interface Request extends ExpressRequest {
    user?: UserDTO;
}

//USER ROUTES
// GET - projects
router.get("/", getCurrentUser, async (req: Request, res: Response) => {
    try {
        const filters = { ...req.query, userId: req.user?.id };
        const result = await projectService.getAllProjects(filters);
        res.status(200).json({ projects: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET - projects/:id
router.get("/:id", getCurrentUser, async (req: Request, res: Response) => {
    try {
        const id = await validateQueryParams(Joi.number().required(), req.params.id);
        const result = await projectService.getProjectById(id, req.user!.id);
        res.status(200).json({ projects: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// POST - projects
router.post("/", getCurrentUser, validateRequestBody(createProjectSchema), async (req: Request, res: Response) => {
    try {
        const params = { ...req.body, user: req.user!.id };
        const result = await projectService.createProject(params);
        res.status(200).json({ projects: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// PATCH - projects
router.patch("/:id", getCurrentUser, validateRequestBody(updateProjectSchema), async (req: Request, res: Response) => {
    try {
        const id = await validateQueryParams(Joi.number().required(), req.params.id);
        const project = await projectService.getProjectById(id, req.user!.id);
        if (!project) {
            throw new Error("Project not found");
        }
        const result = await projectService.updateProject(id, req.body);
        res.status(200).json({ projects: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// DELETE - projects/:id
router.delete("/:id", getCurrentUser, async (req: Request, res: Response) => {
    try {
        const id = await validateQueryParams(Joi.number().required(), req.params.id);
        const project = await projectService.getProjectById(id, req.user!.id);
        if (!project) {
            throw new Error("Project not found");
        }
        const result = await projectService.deleteProject(id);
        res.status(200).json({ projects: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;
