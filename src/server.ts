import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function server(){
    try {

        await mongoose.connect(config.database_url!)
        console.log("connected to MongoDB database successfully using mongoose!");
        app.listen(config.port,()=>{
            console.log(`server is running on port ${config.port}`);
        })
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

server();