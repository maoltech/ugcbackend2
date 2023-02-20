const { jwt } = require("jsonwebtoken");


const userInfoGen = (req) =>{
    const header = req.header.Authorization


    const token = header.split(' ')[1]

    const verfiyToken =  jwt.verify(token, process.env.JWT_SECRET);

    return verfiyToken
}

module.exports = {userInfoGen}