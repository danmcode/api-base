import { IApp } from "./interfaces/app.interface";
import { IServer } from "./interfaces/server.interface";
import { ServerConfig } from "./config/server.config";
import { ExpressAppService } from "./services/express.app.service";
import { HttpServerService } from "./services/http.server.service";

export class App {

    private readonly appService!: IApp;
    private readonly serverService: IServer;
    private readonly config: ServerConfig;

    constructor() {
        this.config = new ServerConfig();
        this.appService = new ExpressAppService();
        this.serverService = new HttpServerService(
            this.appService,
            this.config
        );
    }

    public async start(): Promise<void> {
        await this.serverService.start();
    }

    public async stop(): Promise<void> {
        await this.serverService.stop();
    }

    public getPort(): number {
        return this.serverService.getPort();
    }
}