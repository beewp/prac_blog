const express = require("express");
const Post = require("../schemas/post");
const Coments = require("../schemas/coments");
const router = express.Router();


router.route('/')
    //게시물 조회
    .get(async (req, res) => {
        const post = await Post.find().sort({"dateTime" : -1});
        res.json({ post });
    })
    //게시물 생성
    //제목, 작성자명, 작성 내용 중 원하는 내용 수정하기
    .post(async (req, res) => {
        const { title, author, content} = req.body; 
        const createPost = await Post.create({ title, author, content });
        res.send({ success: createPost });
    });

//게시물 수정
//제목, 작성자명, 작성 내용 중 원하는 내용 수정하기
router.route('/:postId')
    .patch(async (req, res) => {
        const { postId } = req.params;
        console.log(postId);
        const { title, author, content } = req.body; 

        postupdate = await Post.updateOne({ _id: postId },{ $set: { title, author, content} });

        res.send({ success: true });
    })
//게시물 상세 조회
    .get(async (req, res) => {
            const { postId } = req.params;
            console.log(postId)
            const [post] = await Post.find({ _id: postId });

            console.log(post)
            res.json({ post });
    })
//게시물 삭제
// 개시물 삭제 + 댓글 삭제
    .delete(async (req, res) => {
        const { postId } = req.params;
    
        const existspost = await Post.find({ _Id: postId });
        const existscoments = await Coments.find({ postId: postId });
        if (existspost.length) {
            await Post.deleteOne({ _id: postId });
        }
        if (existscoments.length){
            await Coments.delete({ postId: postId });
        }
    
        res.send({ success: true });
    });


//댓글
//개시글에 맞는 모든 댓글  조회 
//날짜 기준 내림차순 정렬 
//
router.route("/:postId/coments")
    .get(async (req, res) => {
        const { postId } = req.params;
        const coments = await Coments.find({ postId: postId }).populate('postId');
        
        console.log(coments);
        res.json({ coments });
    })
    .post(async (req, res)=>{
        const { postId } = req.params;
        const { author, content} = req.body; 
        if ( author === "" || content === "" ){
            return res.status(400).json({ success: false, errorMessage: "댓글 내용을 입력해주세요" });
        }
        const createComents = await Coments.create({ postId, author, content });
        res.send({ coments: createComents });
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
// router.delete("/coments/:comentId", async (req, res) => {
//     const { comentId } = req.params;

//     const existscoments = await Post.find({ comentId: comentId });
//     if (existscoments.length) {
//         await Coments.delete({ comentId });
//     }

//     res.json({ success: true });
// });


module.exports = router;