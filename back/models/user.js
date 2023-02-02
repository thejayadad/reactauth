const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//MAKE USER SCHEUMA
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profileImageUrl: {
      type: String
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
      }
    ]
  });


//PRESAVE HOOK TO ECRYPT THE PASSWORD


userSchema.pre("save", async function(next) {
    try {
      if (!this.isModified("password")) {
        return next();
      }
      let hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      return next();
    } catch (err) {
      return next(err);
    }
  });

//COMPARE THE PASSWORDS ENTERED BY THE USER TO WHAT IS STORED IN THE DATABASE

userSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
      let isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    } catch (err) {
      return next(err);
    }
  };



//CREATING A USER
const User = mongoose.model("User", userSchema);

module.exports = User;