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


router.put('/pushComments/:blogId',  Blog.pushComments)
router.put('/pullComments/:blogId',  Blog.pullComments)
router.put('/likes/:blogId',  Blog.like)

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