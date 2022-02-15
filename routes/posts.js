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
    const { postId } = req.params;

    const existspost = await Post.find({ postId: Number(postId) });
    if (existspost.length) {
        await Post.deleteOne({ postId: Number(postId) });
        await Coments.deleteOne({ postId: Number(postId) });
    }

    res.json({ success: true });
});

//댓글
//개시글에 맞는 댓글  조회
router.get("/goods/:postId/coments", async (req, res) => {
    const postId = req.params;
    const coments = await Coments.find();
    const goodsIds = carts.map((cart) => cart.goodsId); //

    const goods = await Goods.find({ goodsId: goodsIds });
    
    res.json({
        cart: carts.map((cart) => ({
            quantity: cart.quantity,
            goods: goods.find((item) => item.goodsId === cart.goodsId),
        })),
    });
});

//댓글 수정
//
router.put("/goods/:postId/cart", async (req, res) => {
    const { postId } = req.params;
    const { quantity } = req.body;

    const existspost = await Carts.find({ postId: Number(postId) });
    if (!existscarts.length) {
        await Coments.create({ goodsId: Number(postId), quantity});
    } else {
        await Coments.updateOne({ goodsId: Number(postId) },{ $set: { quantity} });
    }


    res.json({ success: true });
});

//댓글 삭제
router.delete("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;

    const existscart = await Carts.find({ goodsId: Number(goodsId) });
    if (existscart.length) {
        await Cart.deleteOne({ goodsId: Number(goodsId) });
    }

    res.json({ success: true });
})


module.exports = router;