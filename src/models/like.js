"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
const user = require('./user')
/* ------------------------------------------------------- */

const LikeSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    

}, { collection: 'likes', timestamps: {
    createdAt: 'time_stamp', 
}  })

module.exports = mongoose.model('Like', LikeSchema)