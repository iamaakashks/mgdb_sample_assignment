const { admin } = require("../db/index.js");
const adminMiddleware = (req, res, next)=>{
    const username = req.headers.username;
    const password = req.headers.password;

    admin
    .findOne({
        username: username,
        password: password
    })
    .then((value)=>{
        if(value){
            next();
        }else{
            res.status(403).json({
                msg: "admin not found"
            })
        }
    })
    .catch((error) => {
        console.error("Database query error:", error);
        res.status(500).json({
            msg: "Internal server error",
        });
    });

};

module.exports = adminMiddleware;