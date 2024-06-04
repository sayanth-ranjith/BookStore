import express from "express";
import {PORT,mongoDbUrl} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Models/Book-Model.js";
const app = express();

app.use(express.json()); 

app.get("/",(req,res)=>{
    res.send({"data":"First page"});
});


//Method to insert book into DB(POST TO DB)

app.post("/pushBook",async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            console.log("Data missing in request while trying to insert your book to the database");
            return res.status(400).send({message:"Send all required fields"});
        }
        const newBook = {
            "title":req.body.title,
            "author":req.body.author,
            "publishYear":req.body.publishYear
        }

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

//Method to get books from DB (GET FROM DB)

app.get("/getBooks",async (req,res)=>{
    try{
        const allBooks = await Book.find();

        res.status(200).send(allBooks)

    }
    catch(error){
        console.log("Error while trying to get books from DB. " + error);
        res.status(500).send(error.message);

    }

});

//Method to get books from DB based on ID (GET FROM DB)

app.get("/getById/:id",async (req,res)=>{
    try{
        var bookId = req.params.id;
        const book = await Book.findById(bookId);
     
        return res.status(200).json(book)
    }
    catch(error){
        console.log("Error while trying to fetch book " + req.params.id );
        return res.status(500).send(error.message);
    }
});

//Update values by ID

app.post("/updateBook/:id",async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send("Enter all appropriate fields.");
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id,req.body);
        if(!updatedBook){
            return res.status(404).send("Data not found.");
        }
        else{
            return res.status(200).send("Data successfully updated.");
        }

    }
    catch(error){
        console.log("Error while trying to update book "+ req.params.id );
        return res.status(500).send(error.message);
    }
});

app.delete("/deleteBook/:id",async(req,res)=>{
    try{
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if(!deletedBook){
            return res.status(404).send("Book not found to delete.");
        }
    
        return res.status(200).send("Deleted successfully.");
    }
    catch(error){
        return res.status(500).send("Error while trying to delete data"+ error.message);
    }


})


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


