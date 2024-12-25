const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://iamaakashks:dW9lbzLEmQFabrrM@cluster0.gc9e5.mongodb.net/course_sell_app");

const AdminSchema = mongoose.Schema({
    username: String,
    password: String
})

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }]
})

const CourseSchema = mongoose.Schema({
    title: String,
    description:String,
    imageLink: String,
    price: Number
})

const admin = mongoose.model("Admin", AdminSchema);
const user = mongoose.model("user", UserSchema);
const course = mongoose.model("course", CourseSchema);

module.exports = {
    admin,
    user,
    course
}