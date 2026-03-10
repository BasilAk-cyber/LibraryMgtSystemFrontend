// Add, View, Search book logics

import Book from '../models/books.js';
import { NotFoundError, ValidationError, UnauthorizedError } from '../utils/error.js';

export const addBook = async (req, res) => {
    const{ name, author, isbn, total = 1, available = total, borrowed = 0} = req.body;
    const library = req.user.id;

    if(!library){
        throw new UnauthorizedError("Login to add book")
    }
    if (!name || !author || !isbn){
        throw new ValidationError('Please provide all fields')
    }
    const book = await Book.findOne({isbn});
    if (book && book.library === library){
        book.total += Number(total)
        await book.save();
        return res.status(201).json({msg: "Book added Succesfully", book })
    }
    const newbook = await Book.create({ name, author, isbn, library, total, available, borrowed });
    res.status(201).json({ msg: "Book added Succesfully", newbook })
}

export const viewBook = async (req, res) => {
    const libraryId = req.user.id;
    const book = await Book.find({ library: libraryId }) ;
    if (!book){ throw new NotFoundError("Books not found") }
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