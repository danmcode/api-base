import { Server } from "http";
import { App } from "./app";

const app: App = new App();
let server: Server;

const serverError = (err: NodeJS.ErrnoException): void => {
    if (err.syscall !== 'listen') { throw err; }
    throw err;
}

const serverListening = (): void => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    console.log('Listening on ' + bind);
}

app.init()
    .then(() => {

        app.express.set('port',
            process.env.PORT || 3000
        );

        server = app.httpServer;
        server.on('error', serverError);
        server.on('listening', serverListening);
        server.listen(3000);
    })
    .catch((err) => {
        console.warn(err);
    });