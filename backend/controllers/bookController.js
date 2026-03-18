// Add, View, Search book logics

import Book from '../models/books.js';
import { NotFoundError, ValidationError, UnauthorizedError } from '../utils/error.js';
import { ObjectId } from 'mongodb';

export const addBook = async (req, res) => {
    const{ name, author, isbn, total = 1, available = total, borrowed = 0} = req.body;
    const library = req.user.id;

    if(!library){
        throw new UnauthorizedError("Login to add book")
    }
    if (!name || !author || !isbn){ 
        throw new ValidationError('Please provide all fields')
    }
    const book = await Book.findOneAndUpdate(
        { isbn, library },
        {
            $inc: { total: total, available: available },
            $setOnInsert: { name, author, borrowed: 0 } 
        },
        { new: true, upsert: true }
    )
    res.status(201).json({ msg: "Book added Succesfully", book }) 
}

export const viewBook = async (req, res) => {
    const libraryId = req.user.id;
    const book = await Book.find({ library: libraryId }) ;
    if (!book){ throw new NotFoundError("Books not found") }
    res.status(200).json({ books: book });
}

export const searchBook = async (req, res) => {
    const title = req.query.title; 
    const libraryId = req.user.id;
    if (!title) {
        throw new ValidationError("Please provide a title to search for");
    }
    if (!libraryId) {
        throw new UnauthorizedError("Login to search for books");
    }
    const pipeline = [
        {
            "$search": {
                "index": "book_default",
                "compund": {
                    "must": [{
                        "text": {
                            "query": title,
                            "path": ["name", "author"],
                            "fuzzy": {
                                "maxEdits": 2
                            }
                        }
                    }],
                    "filter": [{
                        "equals": {
                            "query": new ObjectId(libraryId),
                            "path": "library"
                        }
                    }]
                }
            }
        },
        {
            $project: {
                name: 1,
                author: 1,
                isbn: 1,
                library: 1,
                available: 1
            }
        }
    ];
    const books = await Book.aggregate(pipeline).toArray();
    if (books.length === 0) {
        throw new NotFoundError("No books found matching the title");
    }
    res.status(200).json({ msg:"Books found", books });
}

export const getBookById = async (req, res) => {
    const id = req.params.id;
    const libraryId = req.user.id;
    if (!id) {
        throw new ValidationError("Please provide a book ID to search for");
    }
    const book = await Book.findById({ _id: id, library: libraryId});
    if (!book) {
        throw new NotFoundError("Book not found");
    }
    res.status(200).json({ msg: "Book found", book });

}

export const updateBook = async (req, res) => {
    const id = req.params.id;
    const libraryId = req.user.id;
    const { name, author, isbn, total, available } = req.body;
    if (!id) {
        throw new ValidationError("Please provide a book ID to update");
    } 
    if (!name && !author && !isbn && !total && !available) {
        throw new ValidationError("Please provide at least one field to update");
    }
    const book = await Book.findOneAndUpdate(
        { _id: id, library: libraryId },
        { $set: { name, author, isbn, total, available } },
        { new: true }
    );
    if (!book) {
        throw new NotFoundError("Book not found");
    }
    res.status(200).json({ msg: "Book updated", book });
}

export const deleteBook = async (req, res) => {
    const id = req.params.id;
    const libraryId = req.user.id;
    if (!id) {
        throw new ValidationError("Please provide a book ID to delete");
    }
    const book = await Book.findByIdAndDelete({_id: id, library: libraryId});
    if (!book) {
        throw new NotFoundError("Book not found");
    }
    res.status(200).json({ msg: "Book deleted", book });
}


//Search books by a specific author

//Search book by catergory

//Get total amount of books in library