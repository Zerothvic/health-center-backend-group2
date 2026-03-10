import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Mocking a User Model for this example. 
import User from '../models/User.js';


const login = async (req, res) => {
        const { email, password } = req.body;

  try {
    // Check if user exists
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password matches (bcrypt.compare)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET_TOKEN, { expiresIn: '8h' });
        res.status(200).json({ token, user: {id: user.id, name: user.name, role: user.role} });

  } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
  }
};


const logout = async (req, res) => {
        res.status(200).json({ success: true, message: 'Logged out successfully' });
        };

export {
    login,
    logout
}