const express = require('express');
const Coments = require('../schemas/coments');

const router = express.Router();

router.route('/:comentsId')
    .patch(async (req, res)=>{
        const {comentsId} = req.params;
        const { author, content } = req.body; 
        console.log(author, content);
        if ( author === "" || content === "" ){
            return res.status(400).json({ success: false, errorMessage: "댓글 내용을 입력해주세요" });
        }
        comentsupdate = await Coments.updateOne({ _id: comentsId },{ $set: { author, content} });
        res.json({ comentsupdate, success: true })
    })
    .delete(async (req, res)=>{
        const {comentsId} = req.params;

        const existscoments = await Coments.find({ comentsId: comentsId });
        if (existscoments.length){
            await Coments.deleteOne({ _id: comentsId });
        }

        res.json({ success: true });
    });

module.exports = router;