const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const user = await User.create({ name, email, password });
    return res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (err) {
    return next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

const getUserInfo = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select('name email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = { signup, signin, getUserInfo };
