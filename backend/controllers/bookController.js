// Add, View, Search book logics

import Book from '../models/books.js';

const addBook = async (req, res) => {

    try {
        const{ name, author, isbn, amount = 1} = req.body;

        if (!name || !author || !isbn){
            return res.status(400).json({msg: "Enter all fields"})
        }

        const book = Book.findOne({isbn});

        if (book){
            book.amount += Number(amount)

            await book.Save();

            return res.status(201).json({msg: "Book added Succesfully",id: book._id})
        }

        const newbook = new Book({
            name,
            author,
            isbn,
            amount
        });

        await newbook.save();

        res.status(201).json({
            msg: "Book added Succesfully",
            id: newbook._id,
            newbook
        })
    } catch (error) {
        res.status(404).json({msg: "Failed to add book", error: error.message});
    }    
}

const viewBook = async (req, res) => {

    const title = req.params.name; 

    try {
        
        const book = Book.findOne({ title });

        if (!book){
            return res.status(404).json({msg: "Book not found"})
        }



    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const searchBook = async (req, res) => {

    
}


//search book by name, Id

//Search books by a specific author

//Search book by catergory

//Get total amount of books in library