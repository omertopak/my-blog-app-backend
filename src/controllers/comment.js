"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Blog Controller:

const Commnent = require('../models/comment')

module.exports.Comment = {

    list: async (req, res) => {

        const data = await Commnent.find()

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {

        const data = await Commnent.create(req.body)

        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        })
    },

    read: async (req, res) => {

        // req.params.commentId
        // const data = await Commnent.findById(req.params.commentId)
        const data = await Commnent.findOne({ _id: req.params.commentId })

        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {
        
        // const data = await Commnent.findByIdAndUpdate(req.params.commentId, req.body, { new: true }) // return new-data
        const data = await Commnent.updateOne({ _id: req.params.commentId }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await Commnent.findOne({ _id: req.params.commentId })
        })

    },

    delete: async (req, res) => {
        
        const data = await Commnent.deleteOne({ _id: req.params.commentId })

        res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 )

    },
}