"use client";
import React, { useState } from 'react';
import HomeNav from '../component/homeNav';

const TermsAndConditions = () => {
  const [showMore, setShowMore] = useState(false);
  const termsAndConditions = [
    {
        heading: '1. Services Provided',
        content: [
            '1.1. The Agency delivers media buying and planning services for clients aiming to promote their products or services via various media channels.',
            '1.2. These services may encompass media research, negotiation, placement, and optimization.'
        ]
    },
    {
        heading: '2. Client Responsibilities',
        content: [
            '2.1. Clients must provide accurate and current information regarding their advertising goals, target audience, budget, and other relevant details.',
            '2.2. Clients are responsible for providing timely feedback and approvals throughout the media planning and buying process.',
            '2.3. Clients must fulfill financial obligations as per the agreed payment terms.'
        ]
    },
    {
        heading: '3. Agency Responsibilities',
        content: [
            '3.1. The Agency will use its expertise to plan, negotiate, and execute media campaigns on behalf of the client.',
            '3.2. The Agency will provide regular updates and reports on the performance of media campaigns.',
            '3.3. The Agency will adhere to ethical standards and industry best practices in all dealings with clients and media partners.'
        ]
    },
    {
        heading: '4. Fees and Payments',
        content: [
            '4.1. Clients agree to pay the Agency for services rendered as per the agreed fee structure.',
            '4.2. Payment terms will be outlined in the contract between the client and the Agency.',
            '4.3. Late payments may incur additional fees and impact the continuation of services.'
        ]
    },
    {
        heading: '5. Intellectual Property',
        content: [
            '5.1. All intellectual property rights related to media campaigns, including creative materials and strategies, remain the property of the client.',
            '5.2. Clients grant the Agency the necessary rights to use client-owned intellectual property for executing the agreed services.'
        ]
    },
    {
        heading: '6. Confidentiality',
        content: [
            '6.1. The Agency agrees to maintain the confidentiality of all client information and will not disclose sensitive information to third parties without prior consent.',
            '6.2. Clients agree to provide necessary information to the Agency, understanding it will be used solely for executing the agreed services.'
        ]
    },
    {
        heading: '7. Termination',
        content: [
            '7.1. Either party may terminate the agreement with written notice if the other party fails to fulfill its obligations under these terms and conditions.',
            '7.2. Termination does not relieve either party of financial obligations incurred prior to termination.'
        ]
    },
    {
        heading: '8. Amendments',
        content: [
            '8.1. These terms and conditions may be amended or updated at the Agency\'s discretion.',
            '8.2. Clients will be notified of any changes, and continued use of services constitutes acceptance of the updated terms.'
        ]
    }
];

  
const initialItemCount = 3;
   return (
    <>
    <HomeNav/>
    <div className="bg-white text-black mt-4 ">
      <div className="container mx-auto px-4 py-8">
       
        <div className="w-full flex flex-col">
          <h1 className=" text-3xl md:text-4xl font-bold text-center mb-4 text-red-500">
            Terms and Conditions
          </h1>
          <p className="text-lg pb-5">
            Following are the terms and conditions of
            <span className="text-mlmSky font-bold"> Opus Globals</span>. It’s necessary
            to read all of them for clarity.
          </p>
        </div>
        <div className="pb-5">
          <ul className='md:hidden'>
            {termsAndConditions.slice(0, showMore ? termsAndConditions.length : initialItemCount).map((item, index) => (
              <li key={index} className="list-disc pb-4">
                <p className="text-xl">{item.heading}</p>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
          <ul className='hidden md:block'>
            {termsAndConditions.map((item, index) => (
              <li key={index} className=" pb-4">
                <p className="text-xl font-bold">{item.heading}</p>
                <p className="text-lg text-justify">{item.content}</p>
              </li>
            ))}
          </ul>
          {/* "See More" button (only visible on mobile) */}
          {!showMore && (
            <button
              className="text-mlmSky underline mt-4 md:hidden"
              onClick={() => setShowMore(true)}
            >
              See More
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default TermsAndConditions;
