const express = require('express');
const router = express.Router();
const adminMiddleware = require("../middleware/admin.js");
const { admin, course } = require("../db");

router.post("/signup", async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    await admin.create({
        username:username,
        password:password
    })
    res.json({
        msg: "admin Created successfully"
    })
})

router.post("/courses", adminMiddleware, async (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price
    const course_added = await course.create({
        title,
        description,
        imageLink,
        price
    })
    console.log(course_added);
    res.json({
        msg:`course created successfully with courseId: ${course_added._id}`
    })
})

router.get("/courses", adminMiddleware, async (req, res)=>{
    const response = await course.find({});
    res.json({
        courses: response
    })
})

module.exports = router;