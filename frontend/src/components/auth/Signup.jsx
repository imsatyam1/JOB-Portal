import React, { useState, useEffect, useRef } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import defaultProfilePic from "../../assets/124599.jpeg";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    workstatus: "",
    resume: null,
    termAccepted: false,
    profilePic: null,
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [profilePicError, setProfilePicError] = useState("");

  const maxSize = 2 * 1024 * 1024; // 2MB in bytes

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let tempErrors = {};

    const isEmpty = Object.values(formData).some(
      (value) => value === "" || value === null || value === false
    );

    if (!isEmpty) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = "Invalid email format";
      }

      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
      if (!passwordRegex.test(formData.password)) {
        tempErrors.password =
          "Password must have at least 1 letter, 1 digit, 1 special character, and be >6 characters";
      }

      if (formData.resume) {
        if (
          ![
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(formData.resume.type)
        ) {
          tempErrors.resume = "Invalid file type. Only .pdf or .docx allowed";
        } else if (formData.resume.size > maxSize) {
          tempErrors.resume = "File size exceeds 2MB";
        }
      }

      if (!formData.termAccepted) {
        tempErrors.termAccepted = "You must accept terms and conditions";
      }
    } else {
      tempErrors.general = "Please fill all the fields";
    }

    setErrors(tempErrors);
    setIsFormValid(Object.keys(tempErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input dialog
  };

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    setProfilePicError("");

    if (
      file &&
      !["image/jpeg", "image/jpg", "image/png"].includes(file.type)
    ) {
      setProfilePicError("Only JPG, JPEG, and PNG files allowed");
      return;
    }

    if (file && file.size > maxSize) {
      setProfilePicError("File size exceeds 2MB limit");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (isFormValid) {
      console.log("Form Submitted", formData);
    } else {
      console.log("Form has errors", errors);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="mt-8 flex flex-col lg:my-20 justify-center items-center w-full max-w-screen-lg mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-3/4 lg:w-2/3 border border-gray-300 p-5 rounded-lg bg-white"
        >
          <h1 className="text-lg lg:text-2xl font-bold mb-5">
            Create your <span className="text-blue-600">Job</span> Profile
          </h1>

          {/* Avatar Section */}
          <div className="mb-3 flex items-center justify-center">
            <Avatar className="h-16 w-16 lg:h-20 lg:w-20 cursor-pointer">
              <AvatarImage
                src={formData.profilePic || defaultProfilePic}
                alt="Profile"
                style={{
                  borderRadius: "50%",
                }}
              />
            </Avatar>
          </div>

          {/* Upload Image Button */}
          <div className="mb-5 font-bold flex items-center justify-center">
            <p
              className="text-blue-500 hover:text-blue-600 transition-colors duration-300 cursor-pointer hover:underline"
              onClick={handleButtonClick}
            >
              <span>Upload Image</span>
            </p>

            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              className="hidden"
              ref={fileInputRef}
              onChange={handleProfilePicture}
            />
          </div>

          {profilePicError && (
            <p className="text-red-500 text-center mb-3">{profilePicError}</p>
          )}

          {/* Full Name Input */}
          <div className="mb-2">
            <label className="block mb-2 font-bold">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="What is your name?"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-2">
            <label className="block mb-2 font-bold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Tell us your Email ID"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <label className="block mb-2 font-bold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Work Status Radio Input */}
          <div className="mb-2">
            <label className="block mb-2 font-bold">Work Status</label>
            <div className="flex items-center space-x-6">
              <div>
                <input
                  type="radio"
                  name="workstatus"
                  id="employee"
                  value="employee"
                  checked={formData.workstatus === "employee"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="employee">I'm Searching Job</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="workstatus"
                  id="recruiter"
                  value="recruiter"
                  checked={formData.workstatus === "recruiter"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="recruiter">I'm Recruiter</label>
              </div>
            </div>
          </div>

          {/* Resume Upload Input */}
          <div className="mb-5 mt-4">
            <label className="block mb-2 font-bold">Upload Resume</label>
            <input
              type="file"
              name="resume"
              accept=".pdf, .docx"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleResumeChange}
              required
            />
            <p className="mt-1 text-sm text-gray-500">PDF, DOCX (MAX 2MB)</p>
            {errors.resume && <p className="text-red-500">{errors.resume}</p>}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center mb-5">
            <Checkbox
              id="terms"
              name="termAccepted"
              checked={formData.termAccepted}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, termAccepted: checked })
              }
            />
            <Label htmlFor="terms" className="ml-2">
              Accept terms and conditions
            </Label>
          </div>

          {errors.termAccepted && (
            <p className="text-red-500">{errors.termAccepted}</p>
          )}

          {errors.general && <p className="text-red-500">{errors.general}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white ${
              isFormValid
                ? "bg-gradient-to-r from-blue-900 via-blue-700 to-blue-300"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Submit
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
