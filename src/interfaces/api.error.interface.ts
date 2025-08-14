export interface ApiError {
    status: number;
    message: string;
    errors?: Array<{ type: string; msg: string }>;
}

export interface ValidationError extends ApiError {
    status: 400;
    errors: Array<{ type: string; msg: string; field?: string }>;
}

export interface UnauthorizedError extends ApiError {
    status: 401;
    message: string;
}