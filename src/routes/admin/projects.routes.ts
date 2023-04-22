import { Router, Request as ExpressRequest, Response } from "express";
import { AdminProjectService } from "../../services/projectService";

import { createProjectSchema, updateProjectSchema } from "../../types/project";

import { validateRequestBody, validateQueryParams } from "../../middlewares/dataValidation";
import Joi from "joi";

import { AdminProjectRepository } from "../../repositories/ProjectRepository";
import { getCurrentAdmin } from "../../middlewares/auth";
import { UserDTO } from "../../types/user";

const router = Router();

const projectRepository = new AdminProjectRepository();
const projectService = new AdminProjectService(projectRepository);

interface Request extends ExpressRequest {
    user?: UserDTO;
}

//ADMIN ROUTES
// GET - projects
router.get("/", getCurrentAdmin, async (req: Request, res: Response) => {
    try {
        const filters = req.query;
        const result = await projectService.getAllProjects(filters);
        res.status(200).json({ projects: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET - projects/:id
router.get("/:id", getCurrentAdmin, async (req: Request, res: Response) => {
    try {
        const id = await validateQueryParams(Joi.number().required(), req.params.id);
        const result = await projectService.getProjectById(id);
        res.status(200).json({ projects: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// POST - projects
router.post("/", getCurrentAdmin, validateRequestBody(createProjectSchema), async (req: Request, res: Response) => {
    try {
        const params = { ...req.body, user: req.user?.id };
        const result = await projectService.createProject(params);
        res.status(200).json({ projects: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// PATCH - projects
router.patch("/:id", getCurrentAdmin, validateRequestBody(updateProjectSchema), async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await projectService.updateProject(id, req.body);
        res.status(200).json({ projects: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - projects
router.delete("/:id", getCurrentAdmin, async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await projectService.deleteProject(id);
        res.status(200).json({ projects: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
