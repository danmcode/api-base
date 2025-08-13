import { Router } from "express";
import { RouteDefinition } from "../interfaces/route.definition";
import { routesControllers } from "./routes.controllers";
import BaseController from "../controllers/base.controller";
import { logger } from "../config/logger.config";

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

}

export const  registerRoutes = () : Router => {

    try {
        const router = Router();

        const protectedRoutes = routesControllers;

        protectedRoutes.forEach((controller: BaseController) => {
            router.use(
                `/v1/${controller.basePath}`,
                registerControllerRoutes(controller.routes())
            );
        });

        return router;

    } catch (error: any) {
        logger.error('❌ Unable to register the routes');
        logger.error(`Error name: ${error.name}`);
        logger.error(`Error message: ${error.message}`);
        logger.error(`Stack trace:\n${error.stack}`);
        console.error(error)
        return Router()
    }

}