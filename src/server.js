import { envConfig } from "./config/env.config.js"
import app from "./app.js";

import { connectDB } from "./config/database.config.js";


const startServer = async () => {
    await connectDB()
    
    app.listen(envConfig.port, () => {
        console.log(`Servidor corriendo en http://localhost:${envConfig.port}`);
    });
}

startServer();