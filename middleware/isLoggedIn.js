import jwt from "jsonwebtoken"

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.redirect('/login');
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        console.log(tokenData);
        req.role = tokenData.role ;
        req.fullname = tokenData.fullname ;

        next();
    } catch (error) {
        res.status(401).send('Unauthorized : Invaild token')
    }
};