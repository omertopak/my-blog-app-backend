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

    category_name: {
        type:String,
        default: () => {
            return this.category;
        },
    },

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


    post_viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],

    post_views:{
        type:Number,
        default:function () {
            return this.post_viewers.length;
        },
    },

    comment_count: {
        type: Number,
        default: function () {
            return this.comments.length
        }
    },

    likes_n: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }],

    likes: {
        type: Number,
        default: function () {
            return this.likes_n.length
        }
    },

}, { collection: 'blogs', timestamps: {
    createdAt: 'publish_date', 
    updatedAt: 'update_date'
} })

module.exports = mongoose.model('Blog', BlogSchema)