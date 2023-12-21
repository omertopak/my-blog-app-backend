"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    login: async (req, res) => {
        const {username, email, password } = req.body
        if(username && email && password){
            const user = await findOne({$or:[{username},{email}]})
            if(password==user.passwordEncrypt(password)){
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

    },

    logout: async (req, res) => {
       
    },
}