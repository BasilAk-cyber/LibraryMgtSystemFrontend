// Add, View, Search book logics

import Book from '../models/books.js';

export const addBook = async (req, res) => {
    try {
        const{ name, author, isbn, amount = 1} = req.body;
        if (!name || !author || !isbn){
            return res.status(400).json({msg: "Enter all fields"})
        }
        const book = Book.findOne({isbn});
        if (book){
            book.amount += Number(amount)
            await book.Save();
            return res.status(201).json({msg: "Book added Succesfully", book })
        }
        const newbook = await Book.create({ name, author, isbn, amount });
        await newbook.save();
        res.status(201).json({ msg: "Book added Succesfully", newbook })
    } catch (error) {
        res.status(404).json({msg: "Failed to add book", error: error.message});
    }    
}

export const viewBook = async (req, res) => {
    try {
        const book = Book.find();
        if (!book){ return res.status(404).json({msg: "Book not found"}) }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const searchBook = async (req, res) => {
    const title = req.params.name; 
    try {
        const book = Book.find();
        if (!book){ return res.status(404).json({msg: "Book not found"}) }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}


//search book by name, Id

//Search books by a specific author

//Search book by catergory

//Get total amount of books in library