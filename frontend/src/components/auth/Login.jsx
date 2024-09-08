import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isRemember: false,
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let tempErrors = {};

    const isEmpty = Object.values(formData).some(
      (value) => value === "" || value === null
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

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (isFormValid) {
      console.log("You are LoggedIn");
    } else {
      console.log("Something is wrong", errors);
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
            Find Your<span className="text-blue-600"> Dream Job</span>
          </h1>

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

          {/* Remember Me */}
          <div className="flex items-center mb-5">
            <Checkbox
              id="isRemember"
              name="isRemember"
              checked={formData.isRemember}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isRemember: checked })
              }
            />
            <Label htmlFor="isRemember" className="ml-2">
              Remember Me
            </Label>
          </div>

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

          {/* Signup Link */}
          <p className="mt-4 text-center">
            Create a new account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Click here!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
