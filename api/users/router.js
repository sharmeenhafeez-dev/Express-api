const express = require('express')
const router  =   express.Router()
const {signup,login,getallUsers,getUserbyid,getuserbyEmail,deleteUsers,updateUsers}= require('./controller')


router.post('/signup', signup)

  router.post('/login',login)

  router.get('/getallusers', getallUsers)
  router.get('/getuserbyemail', getuserbyEmail)// quary method
  router.get('/getuserbyid/:_id', getUserbyid) //params method
  router.delete('/delete-user', deleteUsers)
  router.put('/update-user', updateUsers)


    module.exports= router