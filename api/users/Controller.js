const { connect } = require('mongoose');
require('dotenv').config()
const User = require('./model')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')


const signup = async (req, res) => {

  const { username, email, password, userimage } = req.body;
  try {
    await connect(process.env.MONGODB_URL)

    const checkExisting = await User.exists({ email: email })

    if (checkExisting) {
      res.status(409).json({
        message: "user already exist"
      })

    }
    else {
      await User.create({ username, email,userimage,  password: await hash(password, 12) })
      res.status(201).json({
        message: "USER CREATED SUCCESSFULLY"

      })

    }
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    await connect(process.env.MONGODB_URL)
    const checkExisting = await User.findOne({ email: email })

    if (!checkExisting) {

      res.status(404).json({
        message: "USER not found "
      })


    } else {
      // console.log(checkExisting)


      const decryptpassword = await compare(password, checkExisting.password)
      // console.log(decryptpassword)
      if (email == checkExisting.email && decryptpassword) {

        const token = sign({
          username: checkExisting.username,
          email: checkExisting.email,
          id: checkExisting._1d

        }, process.env.JWT_SECRET)

        // console.log(token)
        res.status(200).json({
          message: " successfully loggined ",
          token: token

        })

      } else
        res.status(401).json({
          message: " invalid credentials "

        })  } }

  catch (error) {
    res.json({
      message: error.message
    })
  }
}

const getallUsers = async (req, res) => {
  try {
    await connect(process.env.MONGODB_URL)
      const Users = await User.find()
      res.status(200).json(
          {
              Users: Users
          }
      )

  }

  catch (error) {
      res.status(500).json(
          {
              message: error.message
          }
      )

  }
}

const getuserbyEmail = async (req, res) => {

  const { email } = req.query


  try {
    await connect(process.env.MONGODB_URL)
      const Users = await User.findOne({ email: email })
      res.status(200).json(
          {
              Users: Users
          }
      )

  }

  catch (error) {
      res.status(500).json(
          {
              message: error.message
          }
      )

  }
}

const getUserbyid = async (req, res) => {

  const { _id } = req.params


  try {
    await connect(process.env.MONGODB_URL)
      const Users = await User.findOne({ _id })
      res.status(200).json(
          {
              Users: Users
          }
      )

  }
  catch (error) {
      res.status(500).json(
          {
              message: error.message
          }
      )

  }
}

const deleteUsers = async (req,res)=>{

  const {username} = req.body
  try {
    await connect(process.env.MONGODB_URL)
await User.deleteOne({username:username})

res.status(200).json({
  message: "category deleted sucessfully"
})
    
  }  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }

}
const updateUsers = async (req,res)=>{

  const {_id, username,userimage} = req.body

  const filter = {_id}
  const update = { username,userimage}
  try {
    await connect(process.env.MONGODB_URL)
await User.findOneAndUpdate({filter,update})

res.status(200).json({
  message: "user  updated sucessfully"
})
    
  }  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }

}

module.exports = { signup, login , getallUsers  , getuserbyEmail, getUserbyid, deleteUsers,updateUsers}  