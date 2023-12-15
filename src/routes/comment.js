"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require('express').Router()

// Call Controllers:
const { Comment } = require('../controllers/comment')

// ------------------------------------------
// Comment
// ------------------------------------------
router.route('/')
    .get(Comment.list)
    .post(Comment.create)

router.route('/:commentId')
    .get(Comment.read)
    .put(Comment.update)
    .delete(Comment.delete)

module.exports = router