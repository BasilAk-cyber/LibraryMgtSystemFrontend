//Borrow, Return, Calculate Debt amount, Notification email logic

import BorrowedBook from '../models/borrowedbook.js';
import Member from '../models/member.js';
import Book from '../models/books.js';
import { NotFoundError, ValidationError, UnauthorizedError } from '../utils/error.js';

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
    const memberName = member.name;
    const book = await Book.findOne({ name });
    if (!book.isAvailable()){
        throw new NotFoundError("No Copies of book available");
    }
    const borrowedbook = BorrowedBook.create({ bookname, memberName, library, date, fine, status });
    res.status(201).json({ msg: "Book added Succesfully", borrowedbook })
}

export const returnBook = async (req, res) => {
    const library = req.user.id;
    const memberEmail = req.body.email;
    const Book = req.body.book;
    if (!library){
        throw new UnauthorizedError("Please Login");
    }
    if(!memberEmail || !Book){
        throw new ValidationError("Please enter fields correctly");
    }
    const member = await Member.findOne({ email: memberEmail});
    if(!member){
        throw new ValidationError("Member does not exist");
    }

}