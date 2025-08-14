import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RouteDefinition } from '../interfaces/route.definition';
import { logger } from '../config/logger.config';
import { HttpStatus } from '../enums/http.status.enum';

export default abstract class BaseController {

	/**
	 * Global method to send API response
	 * @param res
	 * @param statusCode
	 */
	public send(res: Response, statusCode: number = HttpStatus.OK): void {
		let obj = {};
		obj = res.locals.data;
		res.status(statusCode).send(obj);
	}

	public handleValidationErrors(req: Request, res: Response): boolean {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.locals.data = errors;
			logger.error(errors);
			this.send(res, HttpStatus.BAD_REQUEST);
			return true;
		}
		return false;
	}

	public handleUnauthorizedError(next: NextFunction, message: string): void {
		next({
			status: HttpStatus.UNAUTHORIZED,
			errors: [{ type: "general", msg: message }]
		});
	}
}
