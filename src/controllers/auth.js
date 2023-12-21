"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const passwordEncrypt = require('../helpers/passwordEncrypt')
const Token = require('../models/token')
module.exports = {

    login: async (req, res) => {
        const {username, email, password } = req.body
        if(username && email && password){
            const user = await findOne({$or:[{username},{email}]})

            if(password==user.passwordEncrypt(password)){
                //token, yoksa token olusturduk
                let tokenData = await Token.findOne({ user_id: user._id })
                if (!tokenData) tokenData = await Token.create({
                    user_id: user._id,
                    token: passwordEncrypt(user._id + Date.now())
                })
                //jwt ile 
                    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '30m' })
                    const refreshToken = jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: '3d' })
                //jwt.sign bize kontrol sistemi icinde olan access ve refresh tokenimizi olusturdu. bizim yapmamiz gereken kontolunu saglamak.

                    res.send({
                        error: false,
                        // FOR REACT PROJECT:
                        key: tokenData.token,
                        // token: tokenData.token,
                        bearer: { accessToken, refreshToken },   //burada da access token ve refresh tokeni kullanmamiz icin aldik.
                        user,
                    })
                res.status(200).sent({
                    error:false,
                    message:"Succesfully Logged In"
                })
                
            }else{
                res.status(200).sent({
                    error:true,
                    message:"Wrong Login Data"
                })
                }
        }else{
            res.status(500).send({
                error:true,
                message:"Please enter username, email and password"
            })
        }
    },

    refresh: async (req, res) => {
        const refreshToken = req.body?.bearer?.refreshToken
        

    },

    logout: async (req, res) => {
       
    },
}