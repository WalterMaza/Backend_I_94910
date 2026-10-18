import mongoose from "mongoose"
import { envConfig } from "./env.config.js"


export const connectDB = async () => {
     try {
        mongoose.connect(envConfig.mongoUri)
        console.log("MongoDB connected")
     } catch (error) {
        console.error("Error connecting to MongoDB", error)
        process.exit(1)
     }
}
