import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Laptop, LogOut, Search, Settings, ShieldQuestion, Book, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

// Reusable component for menu items
const MenuItem = ({ icon: Icon, text }) => (
  <div className="flex my-2 hover:underline cursor-pointer hover:text-xl hover:text-blue-600 active:text-[#F83002] text-sm font-bold">
    <Icon className="mr-2 lg:mr-3" />
    <p>{text}</p>
  </div>
);

// User dropdown menu
const UserMenu = () => (
  <div className="p-4">
    <div className="flex-cols gap-3 lg:gap-4">
      <Avatar className="h-14 w-14 lg:h-16 lg:w-16 cursor-pointer flex items-center justify-center">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-full" />
      </Avatar>
      <div className="flex-cols mt-2">
        <h4 className="text-sm font-bold">Satyam Sandilya</h4>
        <p className="text-xs lg:text-sm text-muted-foreground font-bold">Software Dev.</p>
        <p className="text-sm lg:text-sm text-[#F83002] cursor-pointer font-bold my-2 lg:my-3 hover:text-lg hover:text-blue-600 active:text-[#F83002]">
          View Profile
        </p>
        <hr className="h-px bg-gray-500 border-0 dark:bg-gray-700" />
      </div>
    </div>
    <MenuItem icon={Laptop} text="Jobs" />
    <MenuItem icon={Search} text="Find Jobs" />
    <MenuItem icon={Book} text="Blogs" />
    <MenuItem icon={Settings} text="Settings" />
    <MenuItem icon={ShieldQuestion} text="FAQ's" />
    <MenuItem icon={LogOut} text="Logout" />
  </div>
);

// Guest dropdown menu
const GuestMenu = () => (
  <div className="p-4">
    <ul className="flex flex-col text-base items-start gap-2 font-bold">
      <li className="mx-3 hover:underline cursor-pointer hover:text-xl hover:text-[#F83002] active:text-[#00aaee]">
        Home
      </li>
      <li className="mx-3 hover:underline cursor-pointer hover:text-xl hover:text-[#F83002] active:text-[#00aaee]">
        Jobs
      </li>
      <li className="mx-3 hover:underline cursor-pointer hover:text-xl hover:text-[#F83002] active:text-[#00aaee]">
        Browse
      </li>
    </ul>
    <Link to="/login">
      <Button variant="outline" className="w-full font-bold text-sm mt-2 hover:text-xl hover:text-[#F83002] active:text-[#00aaee]">
        Login
      </Button>
    </Link>
    <Link to="/signup">
      <Button className="mx-1 lg:my-4 w-full py-2 bg-blue-600 text-white rounded-md">
        Signup
      </Button>
    </Link>
  </div>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = false; // Placeholder user authentication state

  return (
    <div className="top-full right-0 max-w-full bg-white border border-gray-200 shadow-lg rounded-lg z-50">
      <div className="flex items-center justify-between mx-auto max-w-[90%] lg:max-w-auto relative">
        <h1 className="text-3xl lg:text-3xl font-bold ml-4 lg:ml-6 my-6">
          Job<span className="text-blue-600">Portal</span>
        </h1>

        {/* Mobile Menu */}
        <div className="flex items-center lg:hidden relative">
          <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
              {user ? <UserMenu /> : <GuestMenu />}
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center gap-4 lg:gap-12">
          <ul className="flex items-center text-base lg:text-lg gap-2 lg:gap-7 font-bold">
            <li className="mx-3 hover:underline cursor-pointer hover:text-blue-600 active:text-[#1F51FF]">
              Home
            </li>
            <li className="mx-3 hover:underline cursor-pointer hover:text-blue-600 active:text-[#1F51FF]">
              Jobs
            </li>
            <li className="mx-3 hover:underline cursor-pointer hover:text-blue-600 active:text-[#1F51FF]">
              Browse
            </li>
            <li className="mx-3 hover:underline cursor-pointer hover:text-blue-600 active:text-[#1F51FF]">
              Blogs
            </li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="font-bold text-lg">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="my-4 w-full py-2 bg-blue-600 text-white rounded-md">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-8 w-8 lg:h-10 lg:w-10">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-full" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 lg:w-80">
                <UserMenu />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Overlay to close the menu when clicking outside */}
      {isMenuOpen && <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />}
    </div>
  );
}
