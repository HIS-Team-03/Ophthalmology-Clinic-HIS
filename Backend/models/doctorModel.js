const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {

      // firstName, lastName , email, phone, address , specialization, birthday

    firstName: {
      type: String,
        //da in case lw mktbsh el esm w 3ashan hwa required fa ben2olo Please add the contact name
      required: [true, "Please add the doctor name"],
    },

    lastName: {
      type: String,
        //da in case lw mktbsh el esm w 3ashan hwa required fa ben2olo Please add the contact name
      required: [true, "Please add the doctor name"],
    },

    email: {
      type: String,
      required: [true, "Please add the doctor email address"],
      unique: [true,"Email address already used"],
    },
    phone: {
      type: String,
      required: [true, "Please add the doctor phone number"],
    },

    address: {
      type: String,
        //da in case lw mktbsh el esm w 3ashan hwa required fa ben2olo Please add the contact name
      required: [true, "Please add the doctor address"],
    },

   specialization: {
      type: String,
        //da in case lw mktbsh el esm w 3ashan hwa required fa ben2olo Please add the contact name
      required: [true, "Please add the doctor specialization"],
    },

    birthday: {
      type: String,
        //da in case lw mktbsh el esm w 3ashan hwa required fa ben2olo Please add the contact name
      required: [true, "Please add the doctor birthday"],
    },

   password: {
      type: String,
        //da in case lw mktbsh el esm w 3ashan hwa required fa ben2olo Please add the contact name
      required: [true, "Please add the account password"],
    },

  },




  {
      // el w2t elly el object da et3ml feh
    timestamps: true,
  }
);

module.exports = mongoose.model("DoctorModel", doctorSchema);