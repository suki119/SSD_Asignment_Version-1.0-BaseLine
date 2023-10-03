const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

// Hash the password before saving it
userSchema.pre('save', async function (next) {
  if (this.isModified('userPassword')) {
    const saltRounds = 10;
    this.userPassword = await bcrypt.hash(this.userPassword, saltRounds);
  }
  next();
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
