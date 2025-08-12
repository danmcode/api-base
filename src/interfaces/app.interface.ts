import { Application } from "express";


export interface IApp {
    getExpressApp(): Application;
    initialize(): Promise<void>;
    configure(): void;
}