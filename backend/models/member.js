import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    debt:{ type: Number }
})

const Member = mongoose.model('Member', memberSchema);

export default Member;