import { AppError } from '../utils/error.js';

export const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong on the server';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = Object.values(err.errors || {}).map(e => e.message);
        message = errors.join(' — ') || 'Invalid data';
    }

    if (err.code === 11000) {
        statusCode = 400;
        message = 'This value is already taken';
    }

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        details: err.message,
        stack: err.stack?.split('\n').slice(0, 8), 
    });
}