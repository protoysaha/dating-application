import express from "express"
const app = express()
// import session from "express-session"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import expressLayouts from "express-ejs-layouts"
import flash from "connect-flash"
import path from "path"
import cookieParser from "cookie-parser";

import { connectDB } from "./config/database.js"
import { auth } from "./middleware/auth.js";


// Database Connection
connectDB()
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
// app.use('/uploads', express.static('uploads'))
app.use(cookieParser())
app.use(expressLayouts)
app.set('layout', 'layout')
app.set('view engine', 'ejs')

//routes
import adminRoutes from "./routes/admin.js";
import apiRoutes from "./routes/api.js";

app.use("/", adminRoutes);
app.use("/api", apiRoutes);
app.use(auth);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started Successfully on port ${PORT}.`);
});


