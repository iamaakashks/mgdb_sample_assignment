const express = require("express");
const mongoose = require('mongoose');
const router = express();
const { user, course } = require("../db");
const userMiddleware = require("../middleware/user");

router.post("/signup", async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(!username | !password){
        return res.status(400).json({
            msg: "username and password is required"
        })
    }
    await user.create({
        username:username,
        password:password
    })
    res.json({
        msg: "user Created successfully",
    })
})

router.get('/courses', async (req, res)=>{
    const response = await course.find({})
    res.json({
        courses: response
    })
})

router.post("/course/:courseId", userMiddleware, async (req, res)=>{
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const response = await user.findOne({
        username: username
    })
    const id = response._id
    await user.updateOne(
        {_id: id},
        {$push: {purchasedCourses: courseId}}
    )
    res.json({
        message:"purchase complete"
    })
})

router.get("/purchasedCourses", userMiddleware, async (req, res)=>{
    const user2 = await user.findOne({
        username: req.headers.username
    })
    console.log(user2.purchasedCourses);
    const Courses = await course.find({
        _id: {"$in" : user2.purchasedCourses}
    })
    res.json({
        courses: Courses
    })
})

module.exports = router;