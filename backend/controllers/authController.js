//Login, SignUp, Logout and create token logic for library
import Library from '../models/library.js';

const librarySignUp = async (req, res) => {
    const { name, password} = req.body;

    if(!name || !password){
        return res.status(400).json({msg: "Enter all fields"})
    }

    try {
        
        const newLibrary = new Library({
            name,
            password
        });

        await newLibrary.save();

        res.status(201).json({
            msg: "Book added Succesfully",
            id: newLibrary._id,
            newbook
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const librarylogin = async (req, res) => {
    const { name, password} = req.body;

    if(!name || !password){
        return res.status(400).json({msg: "Enter all fields"})
    }

    try {
        
        const library = Library.login(name, password);
        
        res.status(200).json({
            msg: "Login Sucessful",
            library
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}