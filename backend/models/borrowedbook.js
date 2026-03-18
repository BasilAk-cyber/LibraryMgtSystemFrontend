import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const borrowedbookSchema = new Schema({
    bookname: { type: String, required: true, unique: true },
    member: { 
        type: Schema.Types.ObjectId, 
        ref:"Member", 
        required: true 
    },
    library: {                       
        type: Schema.Types.ObjectId,
        ref: 'Library',                
        required: [true, "Please login to borrow book"]                 
    },
    date: { type: Date, required: true },
    fine: { type: Number},
    status: { type: String, required: true}
})


const BorrowedBook = mongoose.model('BorrowedBook', borrowedbookSchema);

export default BorrowedBook;