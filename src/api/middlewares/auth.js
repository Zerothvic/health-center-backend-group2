import jwt from 'jsonwebtoken';

// Middleware to verify JWT and attach user context to requests

    const authenticate = (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            // Helps attach user data to request object
            req.user = decoded; 
            next();
        } catch (error) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
    };

    export {
        authenticate
    }