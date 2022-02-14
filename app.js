const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

const postsRouter = require("./routes/posts");

connect();

const RequestMiddleware = (req, res, next) => {
    console.log("Request Url:", req.originalUrl, "-", new Date());
    next(); //다음 미들웨어로 넘어감, 서버가 안끝날 수 있음
    // res.send("미들웨어의 응답");// 안좋은 코드, 복잡해짐
};


//미들웨어 사용
app.use(express.static("static"));
app.use(express.json()); //json 파싱해주는 미들웨어
app.use(express.urlencoded());
app.use(RequestMiddleware);

app.use("/api", [postsRouter]);

// 라우터
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(port, "서버가 켜졌어요");
});
