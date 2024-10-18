import { Button } from '@/components/ui/button'
import React from 'react'
import HomeNav from '../component/homeNav'

const ContactUs = () => {
  return (
    <>
      <HomeNav/>
      <main className='flex justify-center items-center mt-12'>
        <form className="relative border-8 border-mlmSkyLight p-6 rounded-lg grid gap-8 md:flex-1 md:max-w-lg my-4 md:my-12 lg:my-16 bg-white dark:bg-neutral-800 w-full">
          <h2 id="contact" className="text-3xl font-bold">
            Lets Connect
          </h2>
          <div className="relative">
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="peer w-full py-2 border-4 border-mlmSky rounded-md focus:ring-4 dark:focus:ring-offset-2 focus:ring-mlmSky focus:border-mlmSky focus:outline-none dark:bg-mlmSky dark:text-neutral-900 placeholder-transparent"
            />
            <label
              htmlFor="name"
              className="text-neutral-500 text-sm font-bold uppercase absolute -top-4 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-neutral-900 peer-focus:-top-4 peer-focus:left-2 peer-focus:text-neutral-600 dark:peer-focus:text-neutral-300"
            >
              Your Name
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="email"
              placeholder="Your Email"
              className="peer w-full py-2 border-4 border-mlmSky rounded-md focus:ring-4 dark:focus:ring-offset-2 focus:ring-mlmSky focus:border-mlmSky focus:outline-none dark:bg-mlmSky dark:text-neutral-900 placeholder-transparent"
            />
            <label
              htmlFor="email"
              className="text-neutral-500 text-sm font-bold uppercase absolute -top-4 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-neutral-900 peer-focus:-top-4 peer-focus:left-2 peer-focus:text-neutral-600 dark:peer-focus:text-neutral-300"
            >
              Your Email
            </label>
          </div>
          <div className="relative">
            <textarea
              name="content"
              id="content"
              cols={20}
              rows={5}
              placeholder="How can we help?"
              className="peer form-textarea resize-none w-full border-4 border-mlmSky rounded-md focus:ring-4 dark:focus:ring-offset-2 focus:ring-mlmSky focus:border-mlmSky focus:outline-none dark:bg-mlmSky dark:text-neutral-900 placeholder-transparent"
            />
            <label
              htmlFor="content"
              className="text-neutral-500 text-sm font-bold uppercase absolute -top-3 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-6 peer-placeholder-shown:text-neutral-900 peer-focus:-top-4 peer-focus:left-2 peer-focus:text-neutral-600 dark:peer-focus:text-neutral-300"
            >
              How can we help?
            </label>
          </div>
          <Button className='bg-mlmSkyLight hover:bg-mlmSky'>
            Submit
          </Button>
        </form>
      </main>
    </>
  )
}

export default ContactUs
