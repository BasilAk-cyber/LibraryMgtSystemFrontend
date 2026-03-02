import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    name: { type: String, required: [true, 'Please enter name'], unique: [true, 'Name already exists'], trim: true, 
            minlength: [3, 'Name should be more than 3 characters'] },
    password: { type: String, required: true }
})

librarySchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(12);
    console.log('Salt generated');
    this.password = await bcrypt.hash(this.password, salt);          
});

/* librarySchema.static.login = async function (name, password) {
    const library = Library.findOne({ name });

    if (library){
        const isCorrect = await bcrypt.compare(password, this.password); 
        if (isCorrect){
            return library;
        }
        throw new Error("incorrect Password");
    }
    throw new Error("Library not found");
}
 */

const Library = mongoose.model('Library', librarySchema);

export default Library;