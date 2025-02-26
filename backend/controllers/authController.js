import jwt from 'jsonwebtoken'
import User from '../models/User.js'

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

//register user
export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    //Validation: Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        //Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'email already in use' });
        }

        //create the user
        const user = await User.create({
            fullName, email, password, profileImageUrl
        });

        res.status(200).json({
            id: user._id, user, token: generateToken(user._id)
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error: error.message })
    }
}


//login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        return res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })


    } catch (error) {
        return res.status(500).json({ message: 'Error when login', error: error.message })
    }
}

//get user info
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}