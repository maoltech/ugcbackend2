const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../model");

const signup = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  const emailIsUsed = await User.findOne({ where: { email } });
  if (emailIsUsed) {
    return res.status(401).json("Email has already been used");
  }

  const usernameIsTaken = await User.findOne({ where: { username } });
  if (usernameIsTaken) {
    return res.status(401).json("Username has already been taken");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    const payload = { userId: user.userId, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // const token = jwt.sign(
    //   req.body, process.env.JWT_SECRET, { expiresIn: "1h" }
    // );

    // res.cookie('accessToken', token, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: 3600000,
    //   sameSite: 'none'
    // }).
    // status(201).json({
    //   message: 'User created successfully',
    //   user
    // });
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour
        sameSite: "none",
      })
      .status(201)
      .json({
        message: "User created successfully",
        user,
      });
  } catch (error) {
    res.status(500).json({
      message: `Error creating user: ${error}`,
      error,
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
    const payload = { userId: user.userId, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour
        sameSite: "none",
      })
      .json({ Message: "Signed in", token: `Bearer ${token}`, user });
  })(req, res, next);
};

const handleGoogleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    const payload = { userId: user.userId, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour
        sameSite: "none",
      })
      .redirect(
        "https://6401c4d41bec43006d81aa04--gorgeous-licorice-f8928c.netlify.app/services"
      );
  })(req, res, next);
};

const handleTwitterCallback = (req, res, next) => {
  passport.authenticate("twitter", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    const payload = { userId: user.userId, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour
        sameSite: "none",
      })
      .redirect(
        "https://6401c4d41bec43006d81aa04--gorgeous-licorice-f8928c.netlify.app/services"
      );
  })(req, res, next);
};

module.exports = { signup, login, handleGoogleCallback, handleTwitterCallback };
