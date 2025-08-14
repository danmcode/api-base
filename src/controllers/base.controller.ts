import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { ApiResponse, PaginatedData, PaginationInfo } from '../interfaces/api.response.interface';
import { HttpStatus } from '../enums/http.status.enum';
import { ApiError } from '../interfaces/api.error.response';

export default abstract class BaseController {

	protected sendSuccess<T>(
		res: Response,
		data: T,
		statusCode: number = HttpStatus.OK
	): void {
		const response: ApiResponse<T> = {
			success: true,
			data,
			timestamp: new Date().toISOString()
		};

		res.status(statusCode).json(response);
	}

	protected sendPaginated<T>(
		res: Response,
		items: T[],
		pagination: PaginationInfo,
		statusCode: number = HttpStatus.OK
	): void {
		const response: ApiResponse<PaginatedData<T>> = {
			success: true,
			data: {
				items,
				pagination
			},
			pagination: pagination,
			timestamp: new Date().toISOString()
		};

		res.status(statusCode).json(response);
	}

	protected sendError(
		res: Response,
		error: ApiError,
		statusCode: number = HttpStatus.BAD_REQUEST
	): void {
		res.status(statusCode).json(error);
	}

	public handleValidationErrors(req: Request, res: Response): boolean {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const validationError: ApiError = {
				success: false,
				error: {
					code: 'VALIDATION_ERROR',
					message: 'Validation failed',
					details: errors.array().map(error => ({
						field: error.type === 'field' ? error.path : 'unknown',
						message: error.msg,
						value: (error as any).value
					})),
					timestamp: new Date().toISOString(),
					path: req.path,
					method: req.method
				}
			};

			this.sendError(res, validationError, HttpStatus.BAD_REQUEST);
			return true;
		}
		return false;
	}

	public handleUnauthorizedError(next: NextFunction, message: string): void {
		const unauthorizedError: ApiError = {
			success: false,
			error: {
				code: 'UNAUTHORIZED',
				message,
				timestamp: new Date().toISOString(),
				path: 'unknown',
				method: 'unknown'
			}
		};

		next(unauthorizedError);
	}
}