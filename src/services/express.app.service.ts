import express, {
    Application,
    Request,
    Response,
} from "express";
import { IApp } from "../interfaces/app.interface";
import { registerRoutes } from "../routes/routes";
import { HttpStatus } from "../enums/http.status.enum";
import { MiddlewareService } from "./middleware.service";


export class ExpressAppService implements IApp {

    private expressApp: Application;

    constructor() {
        this.expressApp = express();
    }

    async initialize(): Promise<void> {
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended: true }));
    }

    getExpressApp(): Application {
        return this.expressApp;
    }

    configure(): void {
        MiddlewareService.setupMiddlewares(this.expressApp);
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.expressApp.get('/', this.basePathRoute.bind(this));
        this.expressApp.use('/api', registerRoutes())

        this.expressApp.use(this.routeNotFound);
    }

    private basePathRoute(_: Request, res: Response): void {
        res.status(HttpStatus.OK).json({
            message: 'Welcome to Danmcode API',
            timestamp: new Date().toISOString()
        });
    }

    private routeNotFound(req: Request, res: Response) {
        res.status(HttpStatus.NOT_FOUND).json({
            message: 'Route not found',
            path: req.path,
            method: req.method,
            timestamp: new Date().toISOString()
        })
    }

}