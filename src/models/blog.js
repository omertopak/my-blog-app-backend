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
        required: true,
        
    },

    category: {
        type: String,
        required: true
    },

    publish_date: {
        type: Date,
        trim: true,
        
    },

    author: {
        type: String,
    },

    status: {
        type: String,
        enum:["p","d"],
        required: true
    },

    comments: {
        type: String,
        
    },

    category_name: {
        type: String,
        
    },

    likes: {
        type: Number,
        
    },

    post_views: {
        type: Number,
        
    },

    comment_count: {
        type: Number,
        
    },

    likes_n: {
        type: json,
        
    },

}, { collection: 'blogs', timestamps: true })

module.exports = mongoose.model('Blog', BlogSchema)