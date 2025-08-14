import { IApp } from "./interfaces/app.interface";
import { IServer } from "./interfaces/server.interface";
import { ServerConfig } from "./config/server.config";
import { HttpServerService } from "./services/http.server.service";
import { logger } from "./config/logger.config";
import { ExpressAppFactory } from "./factories/express.app.factory";
import { RouteConfigurator } from "./routes/route.configuration";

export class App {

    private readonly appFactory: IApp;
    private readonly routeConfigurator: RouteConfigurator;
    private readonly serverService: IServer;
    private readonly config: ServerConfig;

    constructor() {
        this.config = new ServerConfig();
        this.appFactory = new ExpressAppFactory();
        this.routeConfigurator = new RouteConfigurator(this.appFactory.getExpressApp());
        this.serverService = new HttpServerService(
            this.appFactory,
            this.config
        );
    }

    public async start(): Promise<void> {
        logger.info('🚀 Starting application...');
        await this.serverService.start();
        this.routeConfigurator.configureRoutes();

    }

    public async stop(): Promise<void> {
        await this.serverService.stop();
    }

    public getPort(): number {
        return this.serverService.getPort();
    }
}