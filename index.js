const express = require("express");
const app = express();
const adminRouter = require("./routes/admin.js");
const userRouter = require("./routes/user.js");

app.use(express.json());
app.use('/admin', adminRouter);
app.use('/user', userRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is live on localhost:${port}`);
});