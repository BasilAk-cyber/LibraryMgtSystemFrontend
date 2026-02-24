import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    total: {
        type: Number,
    }
})

const Book = mongoose.model('Book', bookSchema);

export default Book;