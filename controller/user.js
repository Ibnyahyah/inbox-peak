const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


// register new user
const register = async (req, res) => {
    try {
        const { email, username, first_name, last_name, avatar, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const _email = email.toLowerCase();
        const user = await User.findOne({ email: _email });
        if (user) return res.status(400).send({ message: "User already exists, sign in" });
        const newUser = await User.create({ email: _email, username, first_name, last_name, password: hashedPassword, avatar, role });

        const token = jwt.sign({ email: newUser.email, role: newUser.role, username: newUser.username, }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const _user = { email: newUser.email, username: newUser.username, first_name: newUser.first_name, last_name: newUser.last_name, avatar: newUser.avatar, role: newUser.role, token };
        res.status(201).send({ message: "Registration successfully", _user });

    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}

// login new user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const _email = email.toLowerCase();
        const user = await User.findOne({ email: _email });
        if (!user) return res.status(404).send({ message: "User not found, sign up" });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(404).send({ message: "Incorrect Password" });
        const token = jwt.sign({ email: user.email, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const _user = { email: user.email, username: user.username, first_name: user.first_name, last_name: user.last_name, avatar: user.avatar, role: user.role, token };
        res.status(201).send({ message: "Login successfully", _user });

    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}
// update user
const updateUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decodedData.email });
        if (!user) return res.status(404).send({ message: "User not found, sign up" });
        const { email, username, first_name, last_name, avatar } = req.body;
        if (email) user.email = email.toLowerCase();
        if (username) user.username = username;
        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (avatar) user.avatar = avatar;
        await user.save();

        const _user = { email: user.email, username: user.username, first_name: user.first_name, last_name: user.last_name, avatar, token };
        res.status(201).send({ message: "Update successfully", _user });

    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}

// change password
const changePassword = async (req, res) => {
    try {
        const { new_password } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData.role == '' || decodedData.role == undefined || decodedData.role == null) return res.status(403).send({ message: "unauthorized" });
        const user = await User.findOne({ email: decodedData.email });
        if (!user) return res.status(404).send({ message: "User not found, sign up" });
        // const isPasswordValid = await bcrypt.compare(old_password, user.password);
        // if (!isPasswordValid) return res.status(404).send({ message: "Incorrect old Password" });
        const newHashedPassword = await bcrypt.hash(new_password, 12);
        user.password = newHashedPassword;
        await user.save();
        res.status(200).json({ "message": "Password change" });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}

// Create new admin
const createNewAdmin = async (req, res) => {
    try {
        const { email, username, first_name, last_name, avatar, password, role } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData.role.toLowerCase() !== 'admin') return res.status(403).send({ message: "unauthorized" });
        const hashedPassword = await bcrypt.hash(password, 12);
        const _email = email.toLowerCase();
        const user = await User.findOne({ email: _email });
        if (user) return res.status(400).send({ message: "User already exists, sign in" });
        const newUser = await User.create({ email: _email, username, first_name, last_name, password: hashedPassword, avatar, role });

        const _user = { email: newUser.email, role: newUser.role, password };
        res.status(201).send({ message: "User created successfully", _user });

    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}

// Get all User
const getAllUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData.role.toLowerCase() !== 'admin') return res.status(403).send({ message: "unauthorized" });
        const users = await User.find();
        res.status(201).send({ message: "User created successfully", users });

    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}

// update an admin password
const changeAnAdminPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { new_password } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData.role.toLowerCase() !== 'admin') return res.status(403).send({ message: "unauthorized" });
        const user = await User.findById(id);
        if (!user) return res.status(404).send({ message: "User not found, sign up" });
        const newHashedPassword = await bcrypt.hash(new_password, 12);
        user.password = newHashedPassword;
        await user.save();
        res.status(200).json({ "message": "Password change" });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}



// Revoke user access to data
const revokeUserAccess = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData.role.toLowerCase() !== 'admin') return res.status(403).send({ message: "unauthorized" });
        const user = await User.findById(id);
        if (!user) return res.status(404).send({ message: "User not found, sign up" });
        user.access = !user.access;
        await user.save();
        res.status(200).json({ "message": `${user.username} access set to ${user.access}` });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}


module.exports = { register, login, updateUser, changePassword, createNewAdmin, getAllUser, revokeUserAccess };