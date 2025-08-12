import express, { Application } from "express";
import { Server } from "http";

export class App {

    public express!: Application;
    public httpServer!: Server;

    public async init(): Promise<void> {
        this.express = express();
        this.httpServer = new Server(this.express);
    }
}