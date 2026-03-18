import { UnauthorizedError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
//import { env } from 'node:process';

const protectRoute = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        throw new UnauthorizedError('Login Required');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    if (!decoded){
        throw new UnauthorizedError('JWT Not decoded');
    }
    req.user = decoded;           
    next();                       
}

export default protectRoute