import express, {
    Application,
    Request,
    Response,
} from "express";
import { IApp } from "../interfaces/app.interface";


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
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.expressApp.get('/', this.basePathRoute.bind(this));
        this.expressApp.get('/health', this.healthCheck.bind(this));
    }

    private basePathRoute(_: Request, res: Response): void {
        res.json({
            message: 'Base path works',
            timestamp: new Date().toISOString()
        })
    }

    private healthCheck(_: Request, res: Response): void {
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString()
        });
    }


}