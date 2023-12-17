"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const LikeSchema = new mongoose.Schema({

    user_id: {
        type: String,
        trim: true,
        required: true,
    },
    post_id: {
        type: String,
        trim: true,
        required: true,
    },
    

}, { collection: 'likes', timestamps: {
    createdAt: 'time_stamp', 
}  })

module.exports = mongoose.model('Like', LikeSchema)