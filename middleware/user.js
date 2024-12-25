const { user } = require("../db");
const userMiddleware = async (req, res, next)=>{
    const username = req.headers.username;
    const password = req.headers.password;

    const isUser = await user.findOne({
        username: username,
        password: password
    })
    console.log(isUser);
    if(isUser){
        next();
    }else{
        res.status(403).json({
            msg: "user not found"
        })
    }
}

module.exports = userMiddleware;