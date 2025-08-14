import express, { Application } from "express";
import { IApp } from "../interfaces/app.interface";

export class ExpressAppFactory implements IApp {
    private expressApp: Application;

    constructor() {
        this.expressApp = express();
    }

    async initialize(): Promise<void> {
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended: true }));
    }

    configure(): void {

    }

    getExpressApp(): Application {
        return this.expressApp;
    }
}