const bcrypt = require('bcrypt');
const { User } = require('../model')

const getOwnProfile = async (req, res) => {

  try {
    const user = await User.findOne({ userId: req.user.userId })
    res.json({ user })
  } catch (error) {
    res.json(404, 'user not found')
  }
}

module.exports = { getOwnProfile };
