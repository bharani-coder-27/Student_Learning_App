import {insertUser, fetchUser} from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = (req, res)=> {
    const user = req.body;
    insertUser(user, (err, data)=> {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({error: "User Already Exists"});
            }
            console.error("Failed to create user:", err);
            return res.status(500).json({error: "Failed to Create User..."});
        }
        return res.status(201).json({success: true, msg: "User Created Successfully"});
    });
}

export const userLogin = (req, res) => {
    const {email, password}=req.body;
    fetchUser(email, async (err, data)=>{
        if(err)
            return res.status(500).json({success: false, error: "Server Error"});
        if(data.length === 0)
            return res.status(404).json({success: false, error: "User Not Found"});
        const user = data[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid Password' });
        }

    // 🪙 Generate a JWT token
        const token = jwt.sign(
        { id: user.id, email: user.email },
        'your-secret-key', // 🔐 keep this in .env file in production
        { expiresIn: '1d' } // valid for 1 day
        );

        delete user.password;

        return res.json({
        success: true,
        message: "Login successful",
        token,
        user
        });
    });
}