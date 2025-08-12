import { App } from "./app";
import { envs } from "./config/env.config";
import { logger } from "./config/logger.config";

async function main(): Promise<void> {
    const app = new App();

    try {
        await app.start();
        logger.info(`🚀 Server running on ${envs.BASE_URL}`);

        // Graceful shutdown
        process.on('SIGTERM', async () => {
            await app.stop();
            process.exit(0);
        });

        process.on('SIGINT', async () => {
            await app.stop();
            process.exit(0);
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

main().catch((error) => {
    logger.error('Unhandled error:', error);
    process.exit(1);
});