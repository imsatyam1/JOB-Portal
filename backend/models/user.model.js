import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    min: [6, 'Password must be  at least 6 character'],
    max: [12, 'Password not be grater than 12 character'],
    required: [true, "Password is required"],
  },
  workstatus: {
    type: String,
    enum: ['employee', 'recruiter'],
    required: true
  },
  termAccepted: {
    type: Boolean,
    required: true,
    default: false
  },
  profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resume: { type: String }, 
    resumeOriginalName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    profilePhoto: { 
      type: String,
      default: ""
    }
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
