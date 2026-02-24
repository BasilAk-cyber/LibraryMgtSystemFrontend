import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

librarySchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(12);
    console.log('Salt generated');
    this.password = await bcrypt.hash(this.password, salt);          
});

librarySchema.static.login = async function login(name, password) {
    const library = Library.findOne({ name });

    if (!library){
        throw new Error("");
    }

    const isCorrect = await bcrypt.compare(password, this.password); 
    if(!isCorrect){
        throw new Error("");
    }
}


const Library = mongoose.model('Library', bookSchema);

export default Library;