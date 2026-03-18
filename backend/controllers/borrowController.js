//Borrow, Return, Calculate Debt amount, Notification email logic

import BorrowedBook from '../models/borrowedbook.js';
import Member from '../models/member.js';
import Book from '../models/books.js';
import { NotFoundError, ValidationError, UnauthorizedError } from '../utils/error.js';
import { status } from 'express/lib/response.js';

export const lendBook = async (req, res) => {
    const { email, name, fine = 0} = req.body;
    const library = req.user.id;
    const date = null;
    const status = "borrowed";
    if (!library){
        throw new UnauthorizedError("Please Login");
    }
    if (!email || !name){
        throw new ValidationError("Please enter required fields");
    }
    const member = await Member.findOne({ email });
    if(!member){
        throw new NotFoundError("Member is not registered");
    }
    const totalBorrowed = await BorrowedBook.find({member: member._id});
    if(totalBorrowed.length === 3){
        throw new UnauthorizedError("Member currently has 3 borrowed books");
    }
    const memberId = member._id;
    const book = await Book.findOne({ name });
    if (!book.isAvailable()){
        throw new NotFoundError("No Copies of book available");
    }
    const borrowedbook = await BorrowedBook.create({ bookname, memberId, library, date, fine, status });
    book.markBorrowed();
    res.status(201).json({ msg: "Book added Succesfully", borrowedbook })
}

export const returnBook = async (req, res) => {
    const library = req.user.id;
    const {name, email } = req.body;
    if (!library){
        throw new UnauthorizedError("Please Login");
    }
    if(!book || !email){
        throw new ValidationError("Please enter fields correctly");
    }
    const query = { member: member._id, library: library._id, book: name}
    const update = { status: "borrowed"}
    const borrowedbook = await BorrowedBook.findOneAndUpdate({ query, update})
}