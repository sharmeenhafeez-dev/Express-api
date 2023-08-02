const { Schema, model } = require('mongoose')


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    userimage: {
      type: String,
       default: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
    },

    role: {
      type: String,
      required: true,
      default: "user"
    },
    joining: {
      type: Date,
      default: Date.now
    }

  }
)
const User = model('user', userSchema)

module.exports = User