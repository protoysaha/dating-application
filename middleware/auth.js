import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const auth = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader != 'undefined') {
            // const bearer = bearerHeader.split('')
            const token = bearerHeader.split('')[1]
            const user = jwt.verify(token, process.env.JWT_SECRET)

            console.log(user);
            req.token = user;

            next();

        } else {
            res.status(401).json({ message: 'No token provided' })
        }


        if (!token) return res.redirect('/login');
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        console.log(tokenData);
        req.role = tokenData.role;
        req.fullname = tokenData.fullname;

        next();
    } catch (error) {
        res.status(403).send({message :' Invaild  or expried token'})
    }
};



