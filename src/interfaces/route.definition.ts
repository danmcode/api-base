import { Request, Response, NextFunction } from 'express';
import { ValidationChain } from 'express-validator';

export interface RouteDefinition {
	path: string;
	method: 'get' | 'post' | 'put' | 'delete';
	handler: (req: Request, res: Response, next: NextFunction) => void;
	validator?: ValidationChain[];
}

export interface RouteModule {
	basePath: string;
	routes: RouteDefinition[];
}