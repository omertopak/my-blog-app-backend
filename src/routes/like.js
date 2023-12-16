"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require('express').Router()

// Call Controllers:
const { Like } = require('../controllers/like')

// ------------------------------------------
// Like
// ------------------------------------------
router.route('/')
    .get(Like.list)
    .post(Like.create)

router.route('/:likeId')
    .get(Like.read)
    .put(Like.update)
    .delete(Like.delete)

module.exports = router