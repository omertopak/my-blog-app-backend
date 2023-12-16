"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require('express').Router()

// Call Controllers:
const { User } = require('../controllers/user')

// ------------------------------------------
// User
// ------------------------------------------
router.route('/')
    .get(User.list)
    .post(User.create)

router.route('/:userId')
    .get(User.read)
    .put(User.update)
    .delete(User.delete)

module.exports = router