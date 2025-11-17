export type ApiResponse<T = any> = {
    success: boolean;
    status_code: number;
    message: string;
    data?: T;
    error?: T;
}   