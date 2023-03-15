const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    avatar: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "editor", "viewer"],
        required: true,
    },
    access: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;