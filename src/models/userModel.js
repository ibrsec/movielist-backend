const mongoose = require("mongoose");
const passwordEncrypter = require("../helpers/passwordEncrypter");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is a required field!"],
      maxLength: 50,
      unique:true
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is a required field!"],
      maxLength: 50,
      unique:true,
      validate: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is a required field - The password of the user must contain at least one uppercase letter, one lowercase letter, one number, and one special character  = [@$!%*?&]. Length should be between 8 and 16 characters. - !"],
      set: (password) => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (passwordRegex.test(password)) {
          return passwordEncrypter(password);
        } else "Invalid password type!";
      },
      validate: (password) => {
        if (password === "Invalid password type!") {
            throw new CustomError(
                "Password validation not passed! - The password of the user. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character. Length should be between 8 and 16 characters.",
                400
              );
        //   return false;
        } else {
          true;
        }
      },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports.User = mongoose.model("User", UserSchema);
