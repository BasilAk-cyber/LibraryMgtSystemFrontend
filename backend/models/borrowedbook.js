import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const borrowedbookSchema = new Schema({
    name: { type: String, required: true, unique: true },
    memberName: { type: String, required: true },
    date: { type: Date, required: true },
    fine: { type: Number}
})


const BorrowedBook = mongoose.model('BorrowedBook', borrowedbookSchema);

export default BorrowedBook;