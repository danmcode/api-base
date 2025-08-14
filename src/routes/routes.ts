import { Router } from "express";
import { RouteDefinition } from "../interfaces/route.definition";
import { logger } from "../config/logger.config";
import { routeModules } from "./modules";

const registerControllerRoutes = (routes: RouteDefinition[]): Router => {
    const controllerRouter = Router();

    routes.forEach((route) => {
        switch (route.method) {
            case 'get':
                controllerRouter.get(route.path, route.handler);
                break;
            case 'post':
                controllerRouter.post(route.path, route.validator!, route.handler);
                break;
            case 'put':
                controllerRouter.put(route.path, route.validator!, route.handler);
                break;
            case 'delete':
                controllerRouter.delete(route.path, route.validator!, route.handler);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${route.method}`);
        }
    });

    return controllerRouter;
};

export const registerRoutes = (): Router => {
    try {
        const router = Router();

        routeModules.forEach((module) => {
            router.use(
                `/v1/${module.basePath}`,
                registerControllerRoutes(module.routes)
            );
            logger.info(`Mounted routes for: /v1/${module.basePath}`);
        });

        return router;
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('Route registration failed:', error.message);
        }
        return Router();
    }
};