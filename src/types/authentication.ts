import Joi from "joi";

export interface Register {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
});
