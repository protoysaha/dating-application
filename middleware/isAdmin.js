

export const isAdmin = async (req, res, next) => {
    if (req.role === 'admin') {
        next()
    } else {
        res.redirect('/login');
    }
};