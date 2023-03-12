import { Request, Response, NextFunction } from "express";

export function validateRequestBody(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body);
        console.log(result);
        if (result.error) {
            return res.status(400).json({ error: result.error.details[0].message });
        }
        req.body = result.value;
        next();
    };
}

export async function validateQueryParams(schema: any, query: any) {
    try {
        const validatedQuery = await schema.validateAsync(query);
        return validatedQuery;
    } catch (error) {
        throw new Error("Invalid query parameters");
    }
}
