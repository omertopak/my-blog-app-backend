"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Blog Controller:

const Blog = require('../models/blog')

module.exports.Blog = {

    list: async (req, res) => {

        const data = await Blog.find()

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {

        const data = await Blog.create(req.body)

        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        })
    },

    read: async (req, res) => {

        // req.params.categoryId
        // const data = await Blog.findById(req.params.categoryId)
        const data = await Blog.findOne({ _id: req.params.blogId })

        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {
        
        // const data = await Blog.findByIdAndUpdate(req.params.categoryId, req.body, { new: true }) // return new-data
        const data = await Blog.updateOne({ _id: req.params.blogId }, req.body, { runValidators: true })

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
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Add Comments to Pizza"
        */

        const comments = req.body?.comments // ObjectId or [ ObjectIds ]

        // const data = await Pizza.findOne({ _id: req.params.id })
        // data.comments.push(comments)
        // await data.save()
        const data = await Pizza.updateOne({ _id: req.params.blogId }, { $push: { comments: comments } })
        const newData = await Pizza.findOne({ _id: req.params.blogId }).populate('comments')

        res.status(202).send({
            error: false,
            data,
            commentsCount: newData.comments.length,
            new: newData
        })
    },

    pullComments: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Remove Comments from Pizza"
        */

        const comments = req.body?.comments // ObjectId

        // const data = await Pizza.findOne({ _id: req.params.id })
        // data.comments.pull(comments)
        // await data.save()
        const data = await Pizza.updateOne({ _id: req.params.id }, { $pull: { comments: comments } })
        const newData = await Pizza.findOne({ _id: req.params.id }).populate('comments')

        res.status(202).send({
            error: false,
            data,
            commentsCount: newData.comments.length,
            new: newData
        })
    },
}