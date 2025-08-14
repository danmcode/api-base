export interface IEnvironmentConfig {
    PORT: number;
    BASE_URL: string;
    NODE_ENV: "development" | "staging" | "production" | "testing"
    LOG_DIR: string;
}