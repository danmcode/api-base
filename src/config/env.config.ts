import 'dotenv/config';
import env from 'env-var';

export interface IEnvironmentConfig {
    PORT: number;
    BASE_URL: string;
    NODE_ENV: "development" | "staging" | "production" | "testing"
}

export const envs: IEnvironmentConfig = {
    PORT: env.get('PORT').required().asPortNumber(),
    BASE_URL: env.get('BASE_URL').required().asUrlString(),
    NODE_ENV: env.get('NODE_ENV').required().asEnum(["development", "staging", "production", "testing"]),
}