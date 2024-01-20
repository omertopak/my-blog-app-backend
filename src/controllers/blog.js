"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Blog Controller:

const Blog = require('../models/blog')
const Comment = require('../models/comment')
const Like = require('../models/like')

module.exports.Blog = {

    list: async (req, res) => {
       

        const data = await Blog.find()
        .populate("comments")
        .populate("category")
        // .populate("author")
        
        

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {

        // const data = await Blog.create(req.body)
        //  //! permission middleware ile req.user ile user id buraya geldi
        //  console.log("userid=",req.user._id);
        // if(data.author?._id)
        // res.status(201).send({
        //     error: false,
        //     body: req.body,
        //     result: data,
        // })
        let body =  req.body
        const author = req.user._id
        body.author=author
        console.log(body);
        const data = await Blog.create(body)
       
        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        })

    },

    read: async (req, res) => {

        // req.params.categoryId
        const author = req.user._id
        // console.log(req.user);
        await Blog.updateOne({ _id: req.params.blogId },{ $addToSet: { post_viewers: author} })
        const data = await Blog.findById(req.params.blogId).populate("comments")
        
        res.status(200).send({
            error: false,
            result: data
            
        })

    },

    update: async (req, res) => {
        let data = {}
        let message = ""
        let body =  req.body
        const author = req.user._id
        const dataCheck = await Blog.findOne({ _id: req.params.blogId })
        console.log("data",dataCheck.author,author);
        const check = String(dataCheck.author)===String(author)
        console.log("check",check);
        if(check){
            const data = await Blog.updateOne({ _id: req.params.blogId }, body, { runValidators: true })
            message = "updated"
        }else{
            throw new Error ("you can't edit this post.Only author can edit.")
        }
        

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, 
            message:message,
            newData: await Blog.findOne({ _id: req.params.blogId })
        })

    },

    delete: async (req, res) => {
        
        const data = await Blog.deleteOne({ _id: req.params.blogId })

        res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 )

    },
    pushComments: async (req, res) => {
        let body =  req.body
        const username = req.user.username
        body.username=username
        // console.log(body);

        const comment = await Comment.create(body)
        const data = await Blog.updateOne({ _id: req.params.blogId }, { $push: { comments: comment._id } }) 
        const newData = await Blog.findOne({ _id: req.params.blogId }).populate('comments')

        res.status(202).send({
            error: false,
            data,
            commentsCount: newData.comments.length,
            new: newData,
            
        })
    },

    pullComments: async (req, res) => {
       
        const comments = req.body?.comments 
        const data = await Blog.updateOne({ _id: req.params.blogId }, { $pull: { comments: comments } })
        const newData = await Blog.findOne({ _id: req.params.blogId }).populate('comments')

        res.status(202).send({
            error: false,
            data,
            commentsCount: newData.comments.length,
            new: newData
        })
    },

    like: async (req, res) => {
      
        let message = ""
        const author = req.user?._id
        const post_id = req.params?.blogId
        const check = await Blog.findOne({_id: post_id , likes_n: author})
        
        if(check){
            await Blog.updateOne({ _id: post_id }, { $pull: { likes_n: author } })
            console.log(check);
            message = "you disliked a post"
        }else{
            const data = await Blog.updateOne({ _id: post_id }, { $push: { likes_n: author } })
            message = "You liked a post"
        }
        
        
       
        const newData = await Blog.findOne({ _id: req.params.blogId }).populate('likes_n')
        res.status(202).send({
            error: false,
            message:message,
            likesCount: newData.likes_n.length,
            new: newData,
            
        })
    },

}