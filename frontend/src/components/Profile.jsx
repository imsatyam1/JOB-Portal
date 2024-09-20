import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import Footer from './shared/Footer'
import UpdateProfileDialog from './UpdateProfileDialog'

const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;
function Profile() {
    const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
            <div className='flex items-center gap-4'>
                <Avatar className='h-24 w-24'>
                    <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"  alt="Profile"/>
                </Avatar>
                <div>
                    <h1 className='font-medium text-xl'>Satyam Mishra</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, ratione necessitatibus sunt dolore fugit libero aliquid ex accusantium laboriosam tempore consequuntur deserunt ipsum fuga perferendis corporis error, facilis, nostrum natus!</p>
                </div>
            </div>
            <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
        </div>
        <div className='my-5'>
            <div className="flex items-center gap-3 my-2 mx-6">
                <Mail />
                <span>satyam@gmail.com</span>
            </div>
            <div className='flex items-center gap-3 my-4 mx-6'><Contact /><span>123456789</span></div>
        </div>
        <div className='my-5'>
            <h1 className='font-bold text-lg mx-3'>Skills</h1>
            <div className='flex items-center gap-3 p-3'>
                {
                   skills.map((items, index) => (
                    <Badge key={index} className="text-sm px-2 py-1">{items}</Badge>
                   )) 
                }
            </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label className="font-bold text-lg mx-3">Resume</Label>
            {
                isResume ? <a target='blank' href='www.youtube.com' className='text-blue-500 w-full hover:underline cursor-pointer'></a>:<span></span>
            }
        </div>
        <div className='max-4xl mx-auto bg-white rounded-2xl'>
            <h1 className='font-bold text-lg my-5 mx-3'>Applied Jobs</h1>
            {/* Applied Jobs */}
            <AppliedJobTable />
        </div>
      </div>
      <Footer />
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
