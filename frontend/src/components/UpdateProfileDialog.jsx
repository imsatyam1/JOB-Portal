import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { Avatar, AvatarImage } from "./ui/avatar";

function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    // profilePic: user?.profilePic || null,
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.resume || "",
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({...Input, [e.target.name]: e.target.value});
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({...input, file})
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    const formData = new formData();
    formData.append("fullname", input.fullname);
    formData.append("emial", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if(input.file){
        formData.append("file", input.file);
    }
    try{
        setLoading(true);
        const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            withCredentials:true
        });
        if(res.data.success){
            dispatch(setUser(res.data.user));
            console.log(success);
        }
    }
    catch(error){
        console.log(error);
    }
    finally{
        setLoading(false);
    }
    setOpen(false);
    console.log(input);
    
  }

  return (
      <Dialog open={open} className="mt-2 flex flex-col lg:my-5 justify-center items-center w-full max-w-screen-lg mx-auto">
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-lg lg:text-2xl font-bold mb-2">Update Your <span className="text-blue-600">Profile</span></DialogTitle>
          </DialogHeader>
          <form className="w-full md:w-3/4 lg:w-2/3 border border-gray-300 p-5 rounded-lg bg-white">
            {/* Avatar Section
            <div className="mb-3 flex items-center justify-center">
              <Avatar className="h-16 w-16 lg:h-20 lg:w-20 cursor-pointer">
                <AvatarImage
                  src={input.profilePic || Input.profilePic}
                  alt="Profile"
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </Avatar>
            </div>

            {/* Upload Image Button */}
            {/* <div className="mb-5 font-bold flex items-center justify-center">
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
            )} */}
            <div className="mb-2">
                <div className="flex items-center gap-6 mb-3">
                <Label htmlFor="name" className= "block mb-2 font-bold">
                  Name
                </Label>
                <Input
                  id="name"
                  naem="name"
                  type="text"
                  value={input.fullname}
                  className="col-span-3"
                />
                </div>
                <div className="flex  items-center gap-4 mb-3">
                    <Label htmlFor="email" className="block mb-2 font-bold">Email</Label>
                    <Input
                    id="email"
                    name="email"
                    type="email"
                    value={Input.email}
                    className="col-span-3"
                    />
                </div>
                <div className="flex items-center gap-4 mb-3">
                    <Label htmlFor="number" className="block mb-2 font-bold">Number</Label>
                    <Input 
                    id="number"
                    name="number"
                    value={Input.phoneNumber}
                    className="col-span-3"
                    />
                </div>
                <div className="flex items-center gap-4 mb-3">
                    <Label htmlFor="bio" className="block mb-2 font-bold">Bio</Label>
                    <Input
                    id="bio"
                    name="bio"
                    value={input.bio}
                    className="col-span-3"
                    />
                </div>
                <div className="flex items-center gap-4 mb-3">
                    <Label htmlFor="skills" className="block mb-2 font-bold">Skills</Label>
                    <Input
                        id="skills"
                        name="skills"
                        value={input.skills}
                        className="col-span-3" 
                    />
                </div>
                <div className="flex items-center gap-4 mb-3">
                    <Label htmlFor="file" className="block mb-2 font-bold">Resume</Label>
                    <Input
                        id="file"
                        name="file"
                        type="file"
                        accept="application/pdf"
                        className="col-span-3"
                     />
                </div>
              </div>
              <DialogFooter>
                {
                    loading? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spain" />Please wait</Button> : <Button type="submit" className="w-full my-4">Update</Button>
                }
              </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  );
}

export default UpdateProfileDialog;
