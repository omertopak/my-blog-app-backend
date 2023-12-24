"use strict"
const { json } = require('express')
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const BlogSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true,
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    image: {
        type: String,
        trim: true,
        required: true,
        
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
        
    },

    // publish_date: {
    //     type: Date,
    //     trim: true,
        
    // },

    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    status: {
        type: String,
        enum:["p","d"],
        required: true
    },

    comments:  [ // push, pull
        {
          type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
         }
    ],

    // category_name: {
    //     type:String
    // },

    // likes: {
    //     type: Number,
        
    // },

    // post_views: {
    //     type: Number,
        
    // },

    // comment_count: {
    //     type: Number,
        
    // },

    likes_n: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Like"
    },

}, { collection: 'blogs', timestamps: {
    createdAt: 'publish_date', 
    updatedAt: 'update_date'
} })

module.exports = mongoose.model('Blog', BlogSchema)