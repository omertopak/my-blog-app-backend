"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require('express').Router()

// Call Controllers:
const { Category } = require('../controllers/category')

// ------------------------------------------
// Category
// ------------------------------------------
router.route('/')
    .get(Category.list)
    .post(Category.create)

router.route('/:categoryId')
    .get(Category.read)
    .put(Category.update)
    .delete(Category.delete)

module.exports = router