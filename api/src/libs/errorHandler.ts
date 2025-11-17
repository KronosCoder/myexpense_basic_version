import { ZodError } from "zod";
import { ApiResponse } from "../types/api_response";



export function errorHandler (err: unknown): ApiResponse {
    if (err instanceof ZodError) {
        const details = err.issues.map((e) => ({
            field: e.path.join('.'),
            code: e.code,
            message: e.message
        }));
        
        return {
            success: false,
            status_code: 400,
            message: 'Occurred error',
            error: {
                details,
            }
        };
    }

    return {
        success: false,
        status_code: 500,
        message: 'Internal server error',
    }
}