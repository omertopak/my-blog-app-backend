"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions

module.exports = {

    isLogin: (req, res, next) => {

        // Set Passive:
        // return next()
        
        // console.log("userid=",req.user._id);
        // req.author = req.user._id
        // any User:
        if (req.user) {
            next()

        } else {

            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login.')
        }
    },

    
}