import { Application, Request, Response } from "express";
import { registerRoutes } from "../routes/routes";

export class RouteConfigurator {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    configureRoutes(): void {
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.app.get('/', this.basePathRoute.bind(this));
        this.app.use('/api', registerRoutes());
        this.app.use(this.routeNotFound);
    }

    private basePathRoute(_: Request, res: Response): void {
        res.status(200).json({
            message: 'Welcome to Danmcode API',
            timestamp: new Date().toISOString()
        });
    }

    private routeNotFound(req: Request, res: Response): void {
        res.status(404).json({
            message: 'Route not found',
            path: req.path,
            method: req.method,
            timestamp: new Date().toISOString()
        });
    }
}