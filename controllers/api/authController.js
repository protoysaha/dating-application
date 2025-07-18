import User from "../../models/User.js";
import mongoose from "mongoose"

import session from "express-session"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

export const authController = {

    register: async (req, res) => {
        // await User.create(req.body)
        try {
            const { fullname, username, email, role, password } = req.body
            const existingUser = await User.findOne({ $or: [{ username }, { email }] })
            // res.send(user)
            if (existingUser) return res.status(400).json({ message: "Username or email already exist" })

            const user = new User({ fullname, username, email, role, password })
            const savedUser = await user.save()
            res.json(savedUser)

        } catch (err) {
            res.status(500).json({ message: err.message })
        }

    },


    login: async (req, res) => {

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "User not found" })

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(404).json({ message: "Invalid password" })

            }

            const jwtData = {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            };

            const token = jwt.sign(jwtData, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (err) {
            res.status(500).json({ message: err.message })
        }


    },




    // dashboard: async (req, res) => {
    //     res.render('dashboard', { role: req.role, fullname: req.fullname });
    // },

    logout: async (req, res) => {
        res.json({ message: 'Logged out successfully' })
    }
}