// Add, View and Search Logic for members

import Member from '../models/member.js';

export const addMember = (req, res) => {

    const { name, email} = req.body;

    try {
        
        if (!name  || !email){
            return res.status(400).json({ msg: "All fields are required" });;
        }

        const member = new Member({
            name,
            email
        });

        await member.save();

        res.status(201).json({
            msg:"User created succesfully",
            id: member._id;
        })

    } catch (error) {
        res.status(404).json({
            msg:error.message
        });
    }
}

export const viewMembers = (req, res) => {
    try {
        
       const member = await Member.find();

       res.json({
            success: true,
            count: member.length,
            data: member
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

//Search member by Id