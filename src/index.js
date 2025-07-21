import dotenv from "dotenv";
// import {app} from "./app.js";
import { app } from "./app.js";
import connectDB from "./DB/index.js";


// filepath: c:\Users\HP\Desktop\new chai\src\index.js
dotenv.config({ path: '../.env' });



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port ${process.env.PORT }`);
    })
})
    .catch((err) => {
        console.log("MONGOdb connection failed !!!:", err);

        
    });



/*import express from "express";
const app = express();
(async() => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.error("Connection error:", error);
            throw error;
    })

     app.listen(process.env.PORT, () => {
        console.log(`app is listening  on port ${process.env.PORT}`);
    })

    }catch (error) {
        console.error("Error :", error);
        throw error;
        
    }

})() */



