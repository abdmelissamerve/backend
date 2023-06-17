import Joi from "joi";

export interface TaskDTO {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    assignedTo: number;
    projectId: number;
    userId: number;
}

export interface CreateTaskDTO {
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    assignedTo: number;
    projectId: number;
    userId: number;
}

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
    status?: string;
    dueDate?: Date;
    assignedTo?: number;
    projectId?: number;
}

const idSchema = Joi.alternatives().try(Joi.number().integer().positive(), Joi.string().regex(/^\d+$/));

export const taskSchema = Joi.object({
    id: idSchema.required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    status: Joi.string().optional(),
    assignedTo: Joi.number().optional(),
    projectId: Joi.number().required(),
    user: Joi.number().required(),
});

export const createTaskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    status: Joi.string().optional(),
    assignedTo: Joi.number().optional(),
    project: Joi.number().required(),
});

export const updateTaskSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    status: Joi.string().optional(),
    assignedTo: Joi.number().optional(),
});
