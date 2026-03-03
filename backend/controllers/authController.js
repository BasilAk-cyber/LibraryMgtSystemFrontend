//Login, SignUp, Logout and create token logic for library
import Library from '../models/library.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NotFoundError, ValidationError, UnauthorizedError } from '../utils/error.js';

const JWT_SECRET = '057e33ffca74503789cf086fe3f1217ca1a12f219511e440dd351d80e3e3b4fcc396055bc6a5b54130bb2f7c32b8805f2069295c24a53027343b9114180e7181'; // temp only!

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set in environment variables!');
    throw new Error('Server configuration error: JWT secret missing');
  }

function generateToken(user) {
  const payload = { id: user._id };
  console.log('Using JWT_SECRET:', process.env.JWT_SECRET ? '✅ Loaded (length: ' + process.env.JWT_SECRET.length + ')' : '❌ MISSING');
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  return token;
}

export const librarySignUp = async (req, res) => {
    console.log('Content-Type header:', req.get('Content-Type'));
    console.log('Raw body:', req.body);

    const { name, password } = req.body;

    if (!name?.trim() || !password?.trim()) { 
        throw new ValidationError('Name and password are required');
    }
    const trimmedName = name.trim();
    if (trimmedName.length < 3) { 
        throw new ValidationError('Name must be at least 3 characters'); 
    }
    if (password.length < 8) { 
        throw new ValidationError('Password must be at least 8 characters'); 
    }
    const newLibrary = new Library({ name: trimmedName, password });
    await newLibrary.save();
    const token = generateToken(newLibrary);
    res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.status(201).json({
        message: 'Library account created successfully',
        library: {
        id: newLibrary._id,
        name: newLibrary.name,
        },
    });
};


export const libraryLogin = async (req, res) => {
    const { name, password } = req.body;
    if (!name?.trim() || !password?.trim()) { 
        throw new ValidationError('Name and password are required');
    }
    const trimmedName = name.trim();
    if (trimmedName.length < 3) { 
        throw new ValidationError('Name must be at least 3 characters'); 
    }
    if (password.length < 8) { 
        throw new ValidationError('Password must be at least 8 characters'); 
    }
    const library = await Library.findOne({ name: trimmedName });
    if (!library){
        throw new NotFoundError("Library not found");
    }
    console.log(library);
    const savedPassword = library.password;
    const isCorrect = await bcrypt.compare(password, savedPassword); 
    if (!isCorrect){
        throw new UnauthorizedError("Incorrect Password");
    }
    //const library = Library.login(trimmedName, password);
    const token = generateToken(library);
    console.log("jwt created");
    res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.status(201).json({
        message: 'Library login successfully',
        library: {
        id: library.id,
        name: library.name,
        },
    });
}