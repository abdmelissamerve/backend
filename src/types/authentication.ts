import Joi from "joi";

export interface RegisterInputParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export const registerSchema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(50)
        .pattern(/^[a-zA-Z\s]+$/, { name: "letters and spaces" })
        .required(),
    lastName: Joi.string()
        .min(2)
        .max(50)
        .pattern(/^[a-zA-Z\s]+$/, { name: "letters and spaces" })
        .required(),

    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phoneNumber: Joi.string()
        .pattern(/^0((\([0-9]{2,3}\))|([0-9]{1,3}))*?[0-9]{3,4}?[0-9]{3,4}?$/, { name: "valid phone number" })
        .min(10)
        .max(10)
        .required(),
});
