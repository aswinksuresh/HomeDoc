const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true,
        unique:true
    }
})
const bcrypt = require('bcrypt');

authSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
const Auths = new mongoose.model("Authers", authSchema);
module.exports = Auths; 