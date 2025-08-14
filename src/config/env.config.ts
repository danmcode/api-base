import 'dotenv/config';
import env from 'env-var';
import { IEnvironmentConfig } from '../interfaces/enviroment.interface';

export const envs: IEnvironmentConfig = {
    PORT: env.get('PORT').required().asPortNumber(),
    BASE_URL: env.get('BASE_URL').required().asUrlString(),
    NODE_ENV: env.get('NODE_ENV').required().asEnum(["development", "staging", "production", "testing"]),
    LOG_DIR: env.get('LOG_DIR').default('./logs').asString()
}