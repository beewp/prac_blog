const express = require("express");
const Post = require("../schemas/post");
const Coments = require("../schemas/coments");
const router = express.Router();


//게시글 목록 조회
router.get("/post", async (req, res) => {
    const post = await Post.find();
    res.json({ post });
});

//게시물 생성
router.post("/post", async (req, res) => {
    const { postId, title, author, content, dateTime } = req.body; 

    const post = await Post.find({ postId }); 
    if (post.length) {
        return res.status(400).json({ success: false, errorMessage: "이미있는 게시물 입니다." });
    }
    
    const createPost = await Post.create({ postId, title, author, content, dateTime });

    res.json({ post: createPost });
});

//게시물 상세 조회
router.get("/post/:postId", async (req, res) => {
    const { postId } = req.params;
    const [post] = await Post.find({ postId: Number(postId) });

    res.json({
        post,
    });
});

// 개시물 삭제
// 개시물 삭제 + 댓글 삭제
router.delete("/post/:postId", async (req, res) => {
    const post = Post.find({ postId })
    if (post.length) {
        await Cart.deleteOne({ postId: Number(postId) });
    }

    res.json({ success: true });
});


//댓글
//개시글에 맞는 댓글  조회
module.exports = router;