// 

import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <main>
      {/* component */}
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        {/* Admin name  */}
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className=" flex items-center space-x-4">
            <div >
        <Image src="/logo.jpeg" alt="User avatar" className="w-8 sm:w-10 h-8 sm:h-10 rounded-full" width={40} height={40} />
            </div>
             <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">Admin </span>
            </div>
            </div>
            </div>
             {/* message */}
        <div className="flex flex-col space-y-4 p-3 mb-10 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
           <div className="">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                   admin Message
                  </span>
                </div>
                
              </div>
             
            </div>
          
          </div>
          <div className="">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                   user reply
                  </span>
                </div>
              </div>
             
            </div>
          </div>
         </div>



{/* send message */}
 <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className=" flex">
            
            <input
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />
 {/* send button   */}
            <div >
               <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </main>

  )
}

export default page