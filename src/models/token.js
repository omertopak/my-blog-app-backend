"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* -------------------------------------------------------  */

const TokenSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }, 

    token: {
        type: String,
        trim: true,
        required: true,
        index: true,
    }, 

}, { collection: 'tokens', timestamps: true })

/* ------------------------------------------------------- */
module.exports = mongoose.model('Token', TokenSchema)