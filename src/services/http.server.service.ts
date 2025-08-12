import { Server } from "http";
import { IServer } from "../interfaces/server.interface";
import { IApp } from "../interfaces/app.interface";
import { ServerConfig } from "../config/server.config";


export class HttpServerService implements IServer {

    private server: Server | null = null;

    constructor(
        private readonly app: IApp,
        private readonly config: ServerConfig,
    ) { }

    async start(): Promise<void> {
        await this.app.initialize();
        this.app.configure();

        this.server = new Server(this.app.getExpressApp());
        this.server.listen(this.config.getPort());
    }

    async stop(): Promise<void> {
        if (this.server) {
            return new Promise((resolve, reject) => {
                this.server!.close((err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }
    }

    getPort(): number {
        return this.config.getPort();
    }

}