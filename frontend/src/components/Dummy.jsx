import React, { useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

function Dummy() {
    const [dummyText, setDummyText] = useState('')

    const changeEventHandler = (e) => {
        setDummyText(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("dummytext", dummyText)

        try {
            const res = await axios.post(`${USER_API_END_POINT}/test`, formData,
                {headers:{"Content-Type": "multipart/from-data"}, withCredentials: true});
                console.log("send request successfullt");
                
                console.log(res);
                
        } catch (error) {
            console.log(error);         
        }
    }
  return (
    <form onSubmit={submitHandler}>
        <div>
        <Label htmlFor="name" className="text-right">Name</Label>
        <Input
            id="dummytext"
            name="dummytext"
            type="text"
            value={dummyText}
            onChange={changeEventHandler}
            className="col-span-3"
        />
    </div>
    <Button type="submit">Submit</Button>
    </form>
  )
}

export default Dummy
