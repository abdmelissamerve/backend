import Joi from "joi";

export interface ProjectDTO {
    id: number;
    name: string;
    description: string;
    status: string;
    dueDate: Date;
    userId: number;
}

export interface CreateProjectDTO {
    name: string;
    description: string;
    status: string;
    dueDate: Date;
    userId: number;
}

export interface UpdateProjectDTO {
    name?: string;
    description?: string;
    status?: string;
    dueDate?: Date;
}

const idSchema = Joi.alternatives().try(Joi.number().integer().positive(), Joi.string().regex(/^\d+$/));

export const projectSchema = Joi.object({
    id: idSchema.required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    status: Joi.string().optional(),
    user: Joi.number().required(),
});

export const createProjectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    status: Joi.string().optional(),
    user: Joi.number().optional(),
});

export const updateProjectSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    status: Joi.string().optional(),
    user: Joi.number().optional(),
});
