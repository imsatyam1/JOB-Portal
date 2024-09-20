import React, { useState, useEffect, useRef } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import defaultProfilePic from "../../assets/124599.jpeg";
import axios from "axios";
import { USER_API_END_POINT } from '@/utils/constant'
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from "@/redux/authSlice";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    workstatus: "",
    resume: null,
    termAccepted: false,
    profilePic: null,
  });
  const {loading,user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [profilePicError, setProfilePicError] = useState("");

  const maxSize = 2 * 1024 * 1024; // 2MB in bytes

  useEffect(() => {
    validateForm();
  }, [input]);

  const validateForm = () => {
    let tempErrors = {};

    const isEmpty = Object.values(input).some(
      (value) => value === "" || value === null || value === false
    );

    // email validation
    if (!isEmpty) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(input.email)) {
        tempErrors.email = "Invalid email format";
      }
      
      // phone validation
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(input.phoneNumber)) {
        tempErrors.phoneNumber = "Phone number must be 10 digits";
      }

      // password validation
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
      if (!passwordRegex.test(input.password)) {
        tempErrors.password =
          "password must have at least 1 letter, 1 digit, 1 special character, and be >6 characters";
      }

      // resume validation
      if (input.resume) {
        if (
          ![
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(input.resume.type)
        ) {
          tempErrors.resume = "Invalid file type. Only .pdf or .docx allowed";
        } else if (input.resume.size > maxSize) {
          tempErrors.resume = "File size exceeds 2MB";
        }
      }

      // terms validation
      if (!input.termAccepted) {
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
    setInput({
      ...input,
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
        setInput({ ...input, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput({ ...input, resume: file });
    }
  };

  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    validateForm();
    
    if (isFormValid) {
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("workstatus", input.workstatus);
      formData.append("profilePhoto", input.profilePic);
      formData.append("resume", input.resume);
      
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true 
        });
        
        
        if (res.data.success) { 
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
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
                src={input.profilePic || defaultProfilePic}
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
              name="profilePic"
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
              name="fullname"
              placeholder="What is your name?"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={input.fullname}
              onChange={handleChange}
              required
            />
            {errors.fullname && (
              <p className="text-red-500">{errors.fullname}</p>
            )}
          </div>

          {/* email Input */}
          <div className="mb-2">
            <label className="block mb-2 font-bold">email</label>
            <input
              type="email"
              name="email"
              placeholder="Tell us your email ID"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={input.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* phone Input */}
          <div className="mb-2">
            <label className="block mb-2 font-bold">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={input.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
          </div>

          {/* password Input */}
          <div className="mb-2">
            <label className="block mb-2 font-bold">password</label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={input.password}
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
            <div className="flex items-center justify-around space-x-6">
              <div>
                <input
                  type="radio"
                  name="workstatus"
                  id="employee"
                  value="employee"
                  checked={input.workstatus === "employee"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="employee">Find Job</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="workstatus"
                  id="recruiter"
                  value="recruiter"
                  checked={input.workstatus === "recruiter"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="recruiter">Recruiter</label>
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
              checked={input.termAccepted}
              onCheckedChange={(checked) =>
                setInput({ ...input, termAccepted: checked })
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
          {
                        loading ? <Button type="submit" className="w-full py-2 rounded-md text-white g-gradient-to-r from-blue-900 via-blue-700 to-blue-300"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className={`w-full py-2 rounded-md text-white ${ isFormValid ? "bg-gradient-to-r from-blue-900 via-blue-700 to-blue-300" : "bg-gray-400 cursor-not-allowed" }`} disabled={!isFormValid} > SignUp</Button>
          }

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
