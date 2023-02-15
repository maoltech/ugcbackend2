const bcrypt = require('bcrypt');
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { User } = require('../model')


const signup = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User created successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error
    });
  }
};


const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    const payload = { userId: user.userId, email: user.email };;
    const token = jwt.sign(
      payload, process.env.JWT_SECRET, { expiresIn: "1h" }
    );
    res.json({ Message: 'Signed in', token: `Bearer ${token}`, user });
  })(req, res, next);
};


module.exports = { signup, login };