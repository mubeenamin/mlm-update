"use client";


import axios from "axios";
import { useEffect, useState } from "react";




export default  function Notification() {

  const [title, settitle] = useState("");
  const [message, setmessage] = useState("");
  const [user_id, setuser_id] = useState(1)
 

  const handleReset = () => {
    settitle("");
    setmessage("");
    setuser_id(3);
  };
  const handleSubmit = async (event: any) => {
  event.preventDefault();
  try {
    const response = await axios.post("/api/routers/notification/create_notification" , {
      title: title,
      message : message,
      user_id: user_id
    });
    
  
  } catch (error) {
    console.error(error);
  }
  handleReset();
  
};

return (
    <section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
      Notification 
    </h2>
   
    <form className="space-y-8">
    
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="Title"
          
         
        />
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
        <textarea
          value={message}
          onChange={(e) => setmessage(e.target.value )}
          rows={6}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Leave a comment..."
          defaultValue={""}
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="py-3 px-5 bg-mlmSky hover:bg-mlmSkyLight text-sm font-medium text-center text-black rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
      >
        Send message
      </button>
    </form>
  </div>
</section>
 )
}


