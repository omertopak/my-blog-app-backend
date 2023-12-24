"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "username": "test",
    "password": "1234",
    "email": "abc@site.com",
    "isAdmin": "true"
  }
/* ------------------------------------------------------- */
// User Model:

const passwordEncrypt = require('../helpers/passwordEncrypt')

const UserSchema = new mongoose.Schema({
    
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    first_name:{
        type:String,
        trim : true,
        required: true,

    },
    last_name:{
        type:String,
        trim : true,
        required: true,

    },
    email:{
        type: String,
        trim: true,
        required: [true, 'Email field must be required'],
        unique: [true, 'There is this email. Email field must be unique'],
        validate: [
            (email) => email.includes('@') && email.includes('.'),
            'Email type is not correct.'
        ]
    },
    image:{
        type:String,
        trim : true,
        required: true,
    },
    bio:{
        type:String,
        trim : true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password)
    },
    password2: {
        type: String,
        trim: true,
        required: true,
        set: (password2) => passwordEncrypt(password2)
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

}, {
    collection: 'users',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema)


//POST MODEL
// {
//     "username": "",
//     "first_name": "",
//     "last_name": "",
//     "email": "",
//     "image": "",
//     "bio": "",
//     "password": "",
//     "password2": "",
   
// }