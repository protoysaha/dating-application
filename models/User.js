
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define Schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,

    },
    email: {
        type: String,
        require: true,
        unique: true,

    },
    username: {
        type: String,
        require: true,
        unique: true,

    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
        require: true,


    },
})

userSchema.pre('save', async function name(next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password , 12);
    }
    next();
});

// module.exports = mongoose.model('User', userSchema)

const user = mongoose.model("User", userSchema)

export default user
