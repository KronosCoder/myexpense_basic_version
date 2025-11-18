import { ZodError } from "zod";
import { ApiResponse } from "../types/api_response";

export function errorHandler (err: any): ApiResponse {
    if (err instanceof ZodError) return {
        success: false,
        status_code: 400,
        message: err.issues[0].message,
    };

    return {
        success: false,
        status_code: 500,
        message: err.message,
    }
}