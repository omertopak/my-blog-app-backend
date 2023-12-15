"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const CommentSchema = new mongoose.Schema({

    user: {
        type: String,
        trim: true,
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    

}, { collection: 'comments', timestamps: {
    createdAt: 'time_stamp', 
}  })

module.exports = mongoose.model('Comment', CommentSchema)