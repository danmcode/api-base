import { Application } from "express";
import express from 'express';

export class MiddlewareService {

    static setupMiddlewares(app: Application): void {
        app.use(express.json({ limit: '100mb' }));
        app.use(express.urlencoded({ limit: '100mb', extended: true }),);
    }

}