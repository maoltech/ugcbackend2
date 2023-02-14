const bcrypt = require('bcrypt');
const {User } = require('../model')

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

module.exports = { signup };
