//Borrow, Return, Calculate Debt amount, Notification email logic

import BorrowedBook from '../models/borrowedbook.js';
import Member from '../models/member.js';
import Book from '../models/books.js';

export const lendBook = async (req, res) => {
    const { email, name} = req.body;
    if (!email || !name){
        res.status(400).json({ msg: "Please enter email or Book name"})
    }
    const member = await Member.findOne({ email });
    if(member){
        const book = await Book.findOne({ name });
        if (!book.isAvailable() === false){
            res.status(404).json({message: "No more books available"});
        }
        const borrowedbook = BorrowedBook.create({})
    }
}