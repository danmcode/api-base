import { envConfig } from "./env.config";

export class ServerConfig {
    private readonly port: number;

    constructor() {
        this.port = envConfig.PORT;
    }

    public getPort(): number {
        return this.port;
    }
}