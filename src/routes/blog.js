"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require('express').Router()

// Call Controllers:
const { Blog } = require('../controllers/blog')
const {isLogin} = require('../middlewares/permissions')
// ------------------------------------------
// Blog
// ------------------------------------------
router.use(isLogin)
router.route('/')
    .get(Blog.list)
    .post(Blog.create)
router.route('/:blogId')
    .get(Blog.read)
    .put(Blog.update)
    .delete(Blog.delete)


router.put('/:blogId/pushComments',  Blog.pushComments)
router.put('/:blogId/pullComments',  Blog.pullComments)
router.put('/:blogId/like',  Blog.like)

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