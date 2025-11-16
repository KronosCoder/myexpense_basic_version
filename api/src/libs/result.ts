export type ApiResponse<T = any> = {
    success: boolean;
    status_code: number;
    message: string;
    data?: T; 
}

export class Result {
    static success<T>(data: T, message: string = 'Success'): ApiResponse<T> {
        return {
            success: true,
            status_code: 200,
            message,
            data,
        };
    }

    static created<T>(data: T, message: string = 'Created'): ApiResponse<T> {
        return {
            success: true,
            status_code: 201,
            message,
            data,
        };
    }

    static badRequest<T>(message: string = 'Bad request'): ApiResponse<T> {
        return {
            success: false,
            status_code: 400,
            message,
        };
    }

    static notFound<T>(message: string = 'Not found'): ApiResponse<T> {
        return {
            success: false,
            status_code: 404,
            message,
        };
    }

    static unauthorize<T>(message: string = 'Unauthorize'): ApiResponse<T> {
        return {
            success: false,
            status_code: 401,
            message,
        };
    }
    
    static error<T>(message: string = 'Internal server error', status_code: number = 500): ApiResponse<T> {
        return {
            success: false,
            status_code,
            message,
        }
    }
}