"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Blog Controller:

const Blog = require('../models/blog')
const User = require('../models/user')
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
        await Blog.updateOne({ _id: req.params.blogId },{ $addToSet: { post_viewers: author} })
        const data = await Blog.findById(req.params.blogId)
        
        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {
        
        // const data = await Blog.findByIdAndUpdate(req.params.categoryId, req.body, { new: true }) // return new-data
        let body =  req.body
        const author = req.user._id
        body.author=author
        const data = await Blog.updateOne({ _id: req.params.blogId }, body, { runValidators: true })

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await Blog.findOne({ _id: req.params.blogId })
        })

    },

    delete: async (req, res) => {
        
        const data = await Blog.deleteOne({ _id: req.params.blogId })

        res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 )

    },
    pushComments: async (req, res) => {
      

        const comments = req.body?.comments // ObjectId or [ ObjectIds ]
        const comment = await Comment.create(req.body)
        const data = await Blog.updateOne({ _id: req.params.blogId }, { $push: { comments: comment._id } }) 
        const newData = await Blog.findOne({ _id: req.params.blogId }).populate('comments')

        res.status(202).send({
            error: false,
            data,
            commentsCount: newData.comments.length,
            new: newData,
            // daata,
            comments
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
        const check = await Like.findOne({post_id: post_id,user_id:author})
        if(check){
            await Like.deleteOne({user_id:author,post_id:post_id})
            message = "you disliked a post"
        }else{
            const like = await Like.create({user_id:author,post_id:post_id})
            const data = await Blog.updateOne({ _id: req.params.blogId }, { $push: { likes_n: like._id } })
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