import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const memberStatus = {
    PENDING: 'pending',
    VERIFIED: 'verified'
};


const memberSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    library: {                       
        type: Schema.Types.ObjectId,
        ref: 'Library',                
        required: [true, "Please login to add member"]                 
    },
    verifyToken: { type: String },
    verifyed: { 
        type: String, 
        enum: Object.values(memberStatus), 
        default: memberStatus.PENDING 
    },
    createdAt: { type: Date, default: Date.now },
    debt:{ type: Number }
})

const Member = mongoose.model('Member', memberSchema);

export default Member;