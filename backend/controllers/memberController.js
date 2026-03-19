// Add, View and Search Logic for members

import  Member, { memberStatus } from '../models/member.js';
import { UnauthorizedError, ValidationError } from '../utils/error.js';
import { sendVerificationEmail } from '../utils/email.js';
import { ObjectId } from 'mongodb';
import crypto from 'crypto';

export const addMember = async (req, res) => {
    const { name, email, debt = 0} = req.body;
    const library = req.user.id;
    if (!library){ 
        throw new UnauthorizedError(" Please login to carry out this action")
    }
    if (!name  || !email){
        throw new ValidationError("Please enter appropriate fields"); 
    }
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const member = await Member.create({ name, email, library, verifyToken, debt });
    await sendVerificationEmail(email, { 
        name, 
        verificationLink: `${process.env.BASE_URL}/api/v1/library/verify-email?token=${verifyToken}` 
    });
    res.status(201).json({ msg:"User created succesfully", member })   
}

export const viewMembers = async (req, res) => {
    const members = await Member.find({});
    if(!members || members.length === 0){
        return res.status(404).json({ success: false, message: "No members found" });
    }
    res.json({ success: true, count: member.length, data: members });
}

export const getUserBorrowedBook = async (req, res) => {

};

export const searchMember = async (req, res) => {
    const name = req.query.name; 
    const libraryId = req.user.id;
    if (!name) {
        throw new ValidationError("Please provide a name to search for");
    }
    if (!libraryId) {
        throw new UnauthorizedError("Login to search for books");
    }
    const pipeline = [
        {
            "$search": {
                "index": "member_default",
                "compund": {
                    "must": [{
                        "text": {
                            "query": name,
                            "path": "name",
                            "fuzzy": {
                                "maxEdits": 2
                            }
                        }
                    }],
                    "filter": [{
                        "equals": {
                            "query": new ObjectId(libraryId),
                            "path": "library"
                        }
                    }]
                }
            }
        },
        {
            $project: {
                name: 1,
                email: 1,
                debt: 1,
                library: 1
            }
        }
    ];
    const members = await Member.aggregate(pipeline).toArray();
    if (members.length === 0) {
        throw new NotFoundError("No members found matching the name");
    }
    res.status(200).json({ msg: "Members found", members });
}

export const getMemberById = async (req, res) => {
    const { id } = req.params;
    const libraryId = req.user.id;
    if (!id) {
        throw new ValidationError("Please provide a member ID to search for");
    }
    const member = await Member.findById({_id:id, library: libraryId});
    if (!member) {
        throw new NotFoundError("Member not found");
    }
    res.status(200).json({ msg: "Member found", member });
}

export const updateMember = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const libraryId = req.user.id;
    if (!id) {
        throw new ValidationError("Please provide a member ID to update");
    }
    if (!name && !email) {
        throw new ValidationError("Please provide at least one field to update");
    }
    const member = await Member.findOneAndUpdate(
        { _id: id, library: libraryId },
        { $set: { name, email } },
        { new: true }
    );
    if (!member) {
        throw new NotFoundError("Member not found");
    }
    res.status(200).json({ msg: "Member updated", member });
}

export const deleteMember = async (req, res) => {
    const { id } = req.params;
    const libraryId = req.user.id;
    if (!id) {
        throw new ValidationError("Please provide a member ID to delete");
    }
    const member = await Member.findByIdAndDelete({ _id: id, library: libraryId});
    if (!member) {
        throw new NotFoundError("Member not found");
    }
    res.status(200).json({ msg: "Member deleted", member });
}
