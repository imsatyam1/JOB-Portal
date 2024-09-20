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
    type: String, // Changed to String to handle phone numbers better
    required: true
  },
  password: {
    type: String,
    max: [6, 'Password must be  at least 6']
    required: true,
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
    resumeUrl: { type: String }, // Store URL of the resume
    resumeOriginalName: { type: String }, // Optional: store the original file name
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    profilePhotoUrl: { // Store URL of the profile photo
      type: String,
      default: ""
    }
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
