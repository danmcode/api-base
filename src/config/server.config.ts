import { envs } from "./env.config";

export class ServerConfig {
    private readonly port: number;

    constructor() {
        this.port = envs.PORT;
    }

    public getPort(): number {
        return this.port;
    }
}