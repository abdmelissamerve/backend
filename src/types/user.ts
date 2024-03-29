import { Optional } from "sequelize";
import { UserModel } from "../models/user";
import Joi from "joi";

//TODO: create firebase user dto
//TODO: create a toDTO method

export interface UserDTO {
    id: number | string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}

export interface CreateUserDTO extends Optional<UserModel, "id"> {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string;
    isActive: boolean;
    photoUrl?: string;
}

export interface UpdateUserDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    role?: string;
    isActive?: boolean;
    photoUrl?: string;
}

const idSchema = Joi.alternatives().try(Joi.number().integer().positive(), Joi.string().regex(/^\d+$/));

export const userSchema = Joi.object({
    id: idSchema.required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().optional(),
});

export const createUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    role: Joi.string().required(),
    isActive: Joi.boolean().required(),
    photoUrl: Joi.string().optional(),
});

export const updateUserSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    role: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    photoUrl: Joi.string().optional(),
});
