// Add, View and Search Logic for members

import Member from '../models/member.js';
import { UnauthorizedError, ValidationError } from '../utils/error.js';

export const addMember = async (req, res) => {
    const { name, email, debt = 0} = req.body;
    const library = req.user.id;
    if (!library){ throw new UnauthorizedError(" Please login to carry out thos action")}
    if (!name  || !email){ throw new ValidationError("Please enter appropriate fields"); }
    const member = await Member.create({ name, email, library, debt });
    res.status(201).json({ msg:"User created succesfully", member })   
}

export const viewMembers = async (req, res) => {
    const members = await Member.find({});
    if(!members || members.length === 0){
        return res.status(404).json({ success: false, message: "No members found" });
    }
    res.json({ success: true, count: member.length, data: members });
}

//Search member by Id