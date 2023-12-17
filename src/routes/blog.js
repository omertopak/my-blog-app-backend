"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require('express').Router()

// Call Controllers:
const { Blog } = require('../controllers/blog')

// ------------------------------------------
// Blog
// ------------------------------------------
router.route('/')
    .get(Blog.list)
    .post(Blog.create)

router.route('/:blogId')
    .get(Blog.read)
    .put(Blog.update)
    .delete(Blog.delete)


router.put('/:blogId/pushComments',  Blog.pushComments)
router.put('/:blogId/pullComments',  Blog.pullComments)
router.put('/:blogId/pushLikes',  Blog.pushLikes)
router.put('/:blogId/pullLikes',  Blog.pullLikes)

// ------------------------------------------
// BlogPost
// ------------------------------------------
// router.route('/post')
//     .get(BlogPost.list)
//     .post(BlogPost.create)

// router.route('/post/:postId')
//     .get(BlogPost.read)
//     .put(BlogPost.update)
//     .delete(BlogPost.delete)

// router.get('/category/:categoryId/posts', BlogPost.listCategoryPosts)

module.exports = router