export class ServerConfig {
    private readonly port: number;

    constructor() {
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    }

    public getPort(): number {
        return this.port;
    }
}