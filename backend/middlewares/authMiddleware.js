import { UnauthorizedError } from '../utils/error.js';

export const protectRoute = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        throw new UnauthorizedError('Login Required');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwt-secret-key-very-long');
    if (!decoded){
        throw new UnauthorizedError('JWT Not decoded');
    }
    req.user = decoded;           
    next();                       
}