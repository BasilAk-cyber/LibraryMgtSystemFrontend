import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    library: {                       
        type: Schema.Types.ObjectId,
        ref: 'Library',                
        required: [true, "Please login to add member"]                 
    },
    debt:{ type: Number }
})

const Member = mongoose.model('Member', memberSchema);

export default Member;