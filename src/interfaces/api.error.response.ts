// Base error response
export interface ApiError {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
        timestamp: string;
        path: string;
        method: string;
    };
}

// Specific error types
export interface ValidationError extends Omit<ApiError, 'error'> {
    error: {
        code: 'VALIDATION_ERROR';
        message: 'Validation failed';
        details: Array<{
            field: string;
            message: string;
            value?: any;
        }>;
        timestamp: string;
        path: string;
        method: string;
    };
}

export interface NotFoundError extends Omit<ApiError, 'error'> {
    error: {
        code: 'NOT_FOUND';
        message: string;
        timestamp: string;
        path: string;
        method: string;
    };
}