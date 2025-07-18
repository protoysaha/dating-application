import User from "../../models/User.js";
import mongoose from "mongoose"


import dotenv from 'dotenv'
dotenv.config()

export const usersController = {



    allusers: async (req, res) => {
        try {
            const search = req.query.search || ''
            const query = {
                $or: [
                    { fullname: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },

                ]
            }
            const users = await User.find(query)
            res.json(users)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },


}