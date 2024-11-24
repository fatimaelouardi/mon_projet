import Server from "./core/server.js";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.dev' });

const server = new Server();
const httpServer = server.createServer();

httpServer.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
