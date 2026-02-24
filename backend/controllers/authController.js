//Login, SignUp, Logout and create token logic for library
import Library from '../models/library.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;


function generateToken(user) {
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d'
  });

  return token;
}

const librarySignUp = async (req, res) => {
    const { name, password} = req.body;

    if(!name || !password){
        return res.status(400).json({msg: "Enter all fields"})
    }

    try {
        
        const newLibrary = await Library.create({
            name,
            password
        });

        const token = generateToken(newLibrary);

        res.cookie('jwt', token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        res.status(201).json({
            msg: "Book added Succesfully",
            newLibrary
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

        const token = generateToken(library);

        res.cookie('jwt', token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        });
        
        res.status(200).json({
            msg: "Login Sucessful",
            library
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}