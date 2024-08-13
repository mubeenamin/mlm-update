"use client";

import ProtectedRoute from "@/app/component/protectedRoute";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { METHODS } from "http";
import { useState } from "react";




export default  function Notification() {

  const [title, settitle] = useState("");
  const [message, setmessage] = useState("");
  const [user_id, setuser_id] = useState(1)
const handleSubmit = async (event: any) => {
  event.preventDefault();
  try {
    const response = await axios.post("/api/routers/notification/create_notification" , {
      title: title,
      message : message,
      user_id: user_id
    });
    
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <ProtectedRoute>
    <div className="flex flex-col items-center justify-center h-screen">
      <nav>
       <h1>Notification</h1>  
      </nav>
      <div>
        <form >
        <div className='mb-3 mt-3 flex flex-col'>
          <label htmlFor='title' className=''>
           Title
          </label>
          <input
            id='title'
            value={title}
            type='text'
            className='border border-gray-400 p-2 w-96'
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div className='mb-3 mt-3 flex flex-col'>
          <label htmlFor='title' className=''>
           Description 
          </label>
          <input
            type='text'
            className='border border-gray-400 p-2 w-96 h-40'
            onChange={(e) => setmessage(e.target.value )}
          />
        </div>
        <Button type="submit"  onClick={handleSubmit}>Submit</Button>
        </form>
      </div>    
  </div>
  </ProtectedRoute>

    )
}
