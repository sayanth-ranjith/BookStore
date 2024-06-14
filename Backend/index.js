import express from "express";
import {PORT,mongoDbUrl} from "./config.js";
import mongoose from "mongoose";
import router from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json()); 

app.use(cors({
    origin: ['http://localhost:5500', 'http://localhost:5173'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));
app.get("/",(req,res)=>{
    res.send({"data":"First page"});
});

app.use("/books",router);

mongoose
    .connect(mongoDbUrl)
    .then(()=>{
        app.get("/hello",(req,res)=>{
            res.send({"message":"Hello world"});
        });
        console.log("App connected to db");
    })
    .catch((error)=>{
        console.log(error);
    });

app.listen(PORT);


