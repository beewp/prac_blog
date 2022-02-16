const express = require("express");
const Post = require("../schemas/post");
const Coments = require("../schemas/coments");
const router = express.Router();

//게시글 목록 조회
//시간 최신순으로 정렬
router.get("/post", async (req, res) => {
    const post = await Post.find().sort({"dateTime" : -1});
    res.json({ post });
});

//게시물 생성
//제목, 작성자, 작성 내용 받기
router.post("/post", async (req, res) => {
    const { title, author, content} = req.body; 
    dateTime = new Date();
    const createPost = new Post({ title, author, content, dateTime});
    await createPost.save();
    res.send({ success: true });
});

//게시물 수정
//제목, 작성자명, 작성 내용 중 원하는 내용 수정하기
router.put("/post/:postId", async (req, res) => {
    const { postId } = req.params;
    const { title, author, content } = req.body; 

    const post = await Post.find({ _id:postId }); 
    if (post.length) {
        await post.updateOne({ postId },{ $set: { title, author, content} });
    }

    res.send({ success: true });
});

//게시물 상세 조회
// 제목, 작성자명, 작성 날짜, 작성 내용 조회
router.get("/post/:postId", async (req, res) => {
    const { postId } = req.params;
    const [post] = await Post.find({ _Id: postId });
    
    res.json({ post });
});

// 개시물 삭제
// 개시물 삭제 + 댓글 삭제
router.delete("/post/:postId", async (req, res) => {
    const { postId } = req.params;

    const existspost = await Post.find({ _Id: postId });
    if (existspost.length) {
        await Post.deleteOne({ _id: postId });
        await Coments.delete({ postId: postId });
    }

    res.send({ success: true });
});

//댓글
//개시글에 맞는 모든 댓글  조회 x
//날짜 기준 내림차순 정렬 x
//
router.get("/post/:postId/coments", async (req, res) => {
    const postId = req.params;
    const coments = await Coments.find({ postId: postId }).sort({"dateTime" : -1});
    res.json({ 
        coments,
    });
});

router.post("/post/:postId/coments", async (req, res) => {
    const postId = req.params;
    const coments = await Coments.find({ postId: postId }).sort({"dateTime" : -1});

    
    res.send({ success: true });
});

//댓글 수정
//- 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기 o
//- 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기 o
// router.put("/post/:postId/coments/:comentId", async (req, res) => {
//     const { postId, comentId } = req.params;
//     const { postId, author, content } = req.body;

//     const existscoments = await Coments.find({ postId: postId, _id: comentId });
//     if (!existscoments.length) {
//         return res.status(404).json({ success: false, errorMessage: "댓글 내용을 입력해주세요" });
//     } else {
//         await Coments.updateOne({ postId: postId) },{ $set: { author, content} });
//     }

//     res.send({ success: true });
// });

//댓글 삭제
router.delete("/coments/:comentId", async (req, res) => {
    const { comentId } = req.params;

    const existscoments = await Post.find({ comentId: comentId });
    if (existscoments.length) {
        await Coments.delete({ comentId });
    }

    res.json({ success: true });
});


module.exports = router;