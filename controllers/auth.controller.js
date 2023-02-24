const bcrypt = require('bcrypt');
const passport = require('passport')
const jwt = require('jsonwebtoken')


const { User } = require('../model')


const signup = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  const emailIsUsed = await User.findOne({ where: { email } })
  if (emailIsUsed) { return res.status(401).json('Email has already been used') }

  const usernameIsTaken = await User.findOne({ where: { username } })
  if (usernameIsTaken) { return res.status(401).json('Username has already been taken') }

  try {
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


const handleGoogleCallback = (req, res, next) => {
  passport.authenticate(
    'google',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      const payload = { userId: user.userId, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour
        sameSite: 'none'
      }).redirect("http://localhost:3000");
    })(req, res, next);
};


const handleTwitterCallback = (req, res, next) => {
  passport.authenticate(
    'twitter',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      const payload = { userId: user.userId, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour
        sameSite: 'none'
      }).redirect("http://localhost:3000");
    })(req, res, next);
};


module.exports = { signup, login, handleGoogleCallback, handleTwitterCallback };