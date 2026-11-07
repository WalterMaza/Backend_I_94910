import dotenv from "dotenv"

dotenv.config({ quiet: true });

export const envConfig = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI
}
