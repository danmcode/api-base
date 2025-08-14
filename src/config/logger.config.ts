import { existsSync, mkdirSync } from "fs";
import { Logger } from "winston";
import winston = require('winston');
import winstonDaily from 'winston-daily-rotate-file';
import { envs } from "./env.config";

const logDir = envs.LOG_DIR;
const isDevelopment = envs.NODE_ENV === 'development';

if (!existsSync(logDir)) {
    mkdirSync(logDir);
}

const customFormat = winston.format.printf(({
    timestamp,
    level,
    message
}) => {
    return `${timestamp} ${level}: ${JSON.stringify(message)}`;
});

export const logger: Logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat,
    ),
    transports: [

        ...(isDevelopment ? [
            new winston.transports.Console()
        ] : []),
        new winstonDaily({
            level: 'info',
            filename: `${logDir}/info-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new winstonDaily({
            level: 'error',
            filename: `${logDir}/error-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        }),
    ],
});