import Joi from "joi";

//dto for role: users
export interface UserDTO {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
    isPhoneVerified?: boolean;
}

export interface RegisterInputDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string;
    photoUrl?: string;
}

export interface UpdateUserDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
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
    photoUrl: Joi.string().optional(),
});

export const updateUserSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    role: Joi.string().optional(),
    photoUrl: Joi.string().optional(),
});
