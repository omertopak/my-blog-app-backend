"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Blog Controller:

//? BURAYA ADMINLERIN ERSIM HAKKINI VE NORMAL USERLARIN GET ISTEKLERINI AYARLA

const User = require('../models/user')

module.exports.User = {

    list: async (req, res) => {

        const data = await User.find()

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {

        const data = await User.create(req.body)
        if(data.password !== data.password2){
            res.errorStatusCode = 403
            throw new Error('Passwords have to be same!')
        }else(
            res.status(201).send({
            error: false,
            user: req.body,
            result: data,
        })
        )
        
    },

    read: async (req, res) => {

        // req.params.userId
        // const data = await User.findById(req.params.userId)
        const data = await User.findOne({ _id: req.params.userId })

        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {
        
        if(req.body.password==req.body.password2){
        // const data = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }) // return new-data
        const data = await User.updateOne({ _id: req.params.userId }, req.body, { runValidators: true })
        const newData = await User.findOne({ _id: req.params.userId })

        res.status(202).send({
            error: false,
            user: req.body,
            result: data, // update infos
            newData: newData
        })
        }else{
            res.errorStatusCode = 403
            throw new Error('Passwords have to be same!')
        }
    },

    delete: async (req, res) => {
        
        const data = await User.deleteOne({ _id: req.params.userId })

        res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 ).send({
            error:!data.deletedCount,
            data
        })

    },
}