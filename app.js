const express = require("express");
const path = require('path');
const app = express();
const port = 3000;

//라우터 경로
const connect = require("./schemas");
const indexRouter = require('./routes/index');
const postsRouter = require("./routes/posts");
const comentsRouter = require("./routes/coments");

connect();

const RequestMiddleware = (req, res, next) => {
    console.log("Request Url:", req.originalUrl, "-", new Date());

    next(); //다음 미들웨어로 넘어감, 서버가 안끝날 수 있음
    // res.send("미들웨어의 응답");// 안좋은 코드, 복잡해짐
};


//미들웨어 
app.use(express.static("static"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(RequestMiddleware);

//라우터
app.use("/", [indexRouter]);
app.use("/post", [postsRouter]);
app.use("/coments", [comentsRouter]);


app.listen(port, () => {
    console.log(port, "서버가 켜졌어요");
});
