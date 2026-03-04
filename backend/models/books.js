import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: { type: String, required: true},
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    library: {                       
        type: Schema.Types.ObjectId,
        ref: 'Library',                
        required: [true, "Please login to add book"]                 
    },
    total: { type: Number },
    available: { type: Number},
    borrowed: {type: Number}
})
bookSchema.index({ name: 1, library: 1 }, { unique: true });
bookSchema.methods.isAvailable = function(){
    return this.available > 1;
}

const Book = mongoose.model('Book', bookSchema);

export default Book;