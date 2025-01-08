const express = require("express");
const {connectedMongoDb}=require('./connection')
const {logReqRes}=require("./middlewares")
const userRouter=require('./routes/user')

const app = express();


connectedMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(() => console.log("MongoDB Connected"));

app.use(express.urlencoded({ extended: false }))


app.use(logReqRes("log.txt"))

app.use("/api/users",userRouter);

app.listen(8000, () => {
    console.log("server started");
})