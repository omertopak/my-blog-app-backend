"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Blog Controller:

const Like = require('../models/like')

module.exports.Like = {

    list: async (req, res) => {

        const data = await Like.find()

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {

        const data = await Like.create(req.body)
        
        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        })
    },

    read: async (req, res) => {

        // req.params.likeId
        // const data = await Like.findById(req.params.likeId)
        const data = await Like.findOne({ _id: req.params.likeId })

        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {
        
        // const data = await Like.findByIdAndUpdate(req.params.likeId, req.body, { new: true }) // return new-data
        const data = await Like.updateOne({ _id: req.params.likeId }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await Like.findOne({ _id: req.params.likeId })
        })

    },

    delete: async (req, res) => {
        
        const data = await Like.deleteOne({ _id: req.params.likeId })

        res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 )

    },
}