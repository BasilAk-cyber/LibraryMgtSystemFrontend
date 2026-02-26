export const protectRoute = (req, res, next) => {

    const token = req.cookies.jwt;

    if (!token) {
    return res.status(401).json({ error: 'Login' });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwt-secret-key-very-long');
        req.user = decoded;           
        next();                       
    } catch (err) {
        return res.status(401).json({ error: 'Not authorized - invalid/expired token' });
    }

}