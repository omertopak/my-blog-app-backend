"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// app.use(authentication):

// const jwt = require('jsonwebtoken')
const Token = require('../models/token')

module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization || null
    const tokenKey = auth ? auth.split(' ') : null

    if (tokenKey) {

        // if (tokenKey[0] == 'Token') { // SimpleToken

            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('user_id')
            req.user = tokenData ? tokenData.user_id : undefined

            //! login olan kullanicinin token key ile kim oldugunu tespit ettik ve middleware ozelligi olan req.user seklinde request icine kim oldugunu attik user icinde artik user id sini her yere tasimis oluyoruz ve next diyerek ilerdeki islemlerde kullanacagiz eger bir login islemi yoksa userr da null verisi var ve yetkilendirilemeyecek.

        // } 
        // else if (tokenKey[0] == 'Bearer') { // JWT

        //     jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (err, userData) => req.user = userData)
        // }
    }
    next()
}