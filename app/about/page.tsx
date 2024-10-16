import React from 'react'
import HomeNav from '../component/homeNav'

const About = () => {
  return (
    <>
    <HomeNav/>
    <section className="bg-gray-100 md:mt-8">
  <div className=" mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
      <div className="max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About Us
        </h2>
        <p className="mt-4 prose md:text-xl ">
        Opus Globals is a media buying agency. Its primary role is to purchase advertising time slots or spaces from various TV channels, negotiating rates and placements. Once they acquire these advertising slots, they sell them to other companies interested in running their media ads. This allows advertisers to reach their target audience through television channels without directly dealing with the complexities of media buying. The agency acts as an intermediary, facilitating the process for both the TV channels and the companies looking to promote their products or services through advertisements.
Our company allocates 70% of its earned profits to be distributed among its customers, reserving the remaining 30% for internal retention.
"Our company is positioned among distinguished companies committed to provide daily profits to our clients"

Join over 200+ brands advertising on TV with Opus Globals
Our clients come from all stages; from TV novices to experienced advertisers, and different industries. No matter the stage or size of budget - our technology and service put your goals first.
        </p>
       
      </div>
      <div className="mt-12 md:mt-0">
        <img
          src="/about.jpg"
          alt="About Us Image"
          className="object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
</section>


    </>
  )
}

export default About