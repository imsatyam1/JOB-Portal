import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [input, setInput] = useState({
    id: "",
    password: "",
    isRemember: false,
  });
  const {loading, user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [input]);

  const validateForm = () => {
    let tempErrors = {};

    const isEmpty = Object.values(input).some(
      (value) => value === "" || value === null
    );

    if (!isEmpty) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const phoneRegex = /^[0-9]{10}$/;
      if (!emailRegex.test(input.id) && !phoneRegex.test(input.id)) {
        tempErrors.id = "Wrong Input!";
      }

      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
      if (!passwordRegex.test(input.password)) {
        tempErrors.password =
          "Password must have at least 1 letter, 1 digit, 1 special character, and be >6 characters";
      }
    } else {
      tempErrors.general = "Something is wrong!!";
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    validateForm();
    if (isFormValid) {
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
          header: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });
        console.log(res.data.message);
        if (res.data.success) {
          dispatch(setUser(res.data.user))
          navigate("/");
          toast(res.data.message);
          <ToastContainer />
        }
      } catch (error) {
        toast.error(error.response.data.message);
        <ToastContainer />
      }
      finally {
        dispatch(setLoading(false));
      }
    }
  }

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
            <label className="block mb-2 font-bold">Email/Phone Number</label>
            <input
              type="text"
              name="id"
              placeholder="Tell us your Email ID"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={input.id}
              onChange={handleChange}
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
              value={input.password}
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
              checked={input.isRemember}
              onCheckedChange={(checked) =>
                setInput({ ...input, isRemember: checked })
              }
            />
            <Label htmlFor="isRemember" className="ml-2">
              Remember Me
            </Label>
          </div>

          {/* Submit Button */}
          {
                        loading ? <Button type="submit" className="w-full py-2 rounded-md text-white g-gradient-to-r from-blue-900 via-blue-700 to-blue-300"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className={`w-full py-2 rounded-md text-white ${ isFormValid ? "bg-gradient-to-r from-blue-900 via-blue-700 to-blue-300" : "bg-gray-400 cursor-not-allowed" }`} disabled={!isFormValid} > Login</Button>
          }
          
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
