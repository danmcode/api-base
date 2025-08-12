import 'dotenv/config';
import env from 'env-var';

export interface IEnvironmentConfig {
    PORT: number;
    BASE_URL: string;
}

export const envConfig: IEnvironmentConfig = {
    PORT: env.get('PORT').required().asPortNumber(),
    BASE_URL: env.get('BASE_URL').required().asUrlString()
}