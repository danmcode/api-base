import { existsSync, mkdirSync } from "fs";
import { Logger } from "winston";
import winston = require('winston');
import winstonDaily from 'winston-daily-rotate-file';
import { envs } from "./env.config";

const LOG_DIR = './logs';
const isDevelopment = envs.NODE_ENV === 'development';

if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR);
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
            filename: `${LOG_DIR}/info-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new winstonDaily({
            level: 'error',
            filename: `${LOG_DIR}/error-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        }),
    ],
});