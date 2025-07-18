import User from "../models/User.js"
import mongoose from "mongoose"

import session from "express-session"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

export const authController = {
    login: async (req, res) => {
        res.render('login', {
            layout: false,
            error: null
        });
    },
    register: async (req, res) => {
        res.render('register', {
            layout: false
        });
    },
    register_submit: async (req, res) => {
        await User.create(req.body)

        res.redirect('/login');

    },

    auth: async (req, res) => {

        // const { email, password } = req.body
        // try {
        //     const user = await User.findOne({ email })
        //     // res.send(user)
        //     if (!user) return res.render('login', { error: 'User not found' })

        //     const isMatch = await bcrypt.compare(password, user.password)
        //     if (!isMatch) return res.render('login', { error: 'Invalid Password' })

        //         jwtData = { id: user._id, fullname: user.fullname, email:user.email, role: user.role }

        //     const token = jwt.sign(jwtData, process.env.JWT_SECRET ,{expiresIn:'1h'})
        //     res.cookie('token', token, { httpOnly: true, maxAge: 60*60*1000 })
        //     res.redirect('/dashboard')

        // } catch (error) {

        // }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.render('login', { error: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.render('login', { error: 'Invalid password' });
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

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
                secure: process.env.NODE_ENV === 'production'
            });

            res.redirect('/dashboard');
        } catch (err) {
            console.error(err);
            res.render('login', { error: 'Something went wrong, try again.' });
        }


    },




    dashboard: async (req, res) => {
        res.render('dashboard',{role: req.role, fullname: req.fullname});
    },

    logout: async (req, res) => {
        res.clearCookie('token')
        res.redirect('/login')
    }
}
