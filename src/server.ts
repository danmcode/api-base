import { App } from "./app";

async function main(): Promise<void> {
    const app = new App();

    try {
        await app.start();
        console.log(`🚀 Server running on port ${app.getPort()}`);

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
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
});