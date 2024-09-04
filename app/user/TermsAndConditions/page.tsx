"use client";
import React, { useState } from 'react';

const TermsAndConditions = () => {
  const [showMore, setShowMore] = useState(false);
  const listItems = [
    'The Client shall be obliged to provide correct, accurate, and complete personal data/information as requested by the Company.',
    'If the amount of available funds is sufficient to open an account – the account will be opened.',
    'If an individual invests in our company and wishes to withdraw their investment within 7 days, there will be a 15% deduction in the return of their initial investment, and the entire amount of their profits will be retained by the company.',
    'Investing with the goal of long-term profit can be a strategic approach. Consider researching and diversifying your investments to manage risk and potentially enhance returns over the 7-year period.',
    'The client shall notify the Company immediately regarding unauthorized access to his/her trading account. The Company shall be entitled to block immediately the client’s trading account and increase the processing time and/or cancel withdrawal requests without prior notification to the Client, and the Client will not be entitled to any profits made during the time the account was unauthorized accessed.',
    'If a company experiences a loss, it will offset the profit for that particular period, potentially reducing or eliminating the overall profit for that month.',
    'If a company provides a mobile laptop or a car with a stipulation of a 30 percent fee upon resale, the applicability of this condition relies on the specific terms and conditions established by the company. It is advisable to thoroughly review the gift agreement or company policies for precise and accurate information.',
    'If a system failure causes someone to be unable to receive their profit, the company is surely responsible for paying the individual directly to fix the problem.',
    'Irrevocably accept full responsibility for his/her actions according to current tax legislation valid at the place of residence/living of the Client regarding any performed transactions/Operations, including but not limited to revenue/income tax.',
  ];
  
const initialItemCount = 3;
   return (
    
    <div className="bg-white text-black ">
      <div className="container mx-auto px-4 py-8">
       
        <div className="w-full flex flex-col">
          <h1 className=" text-3xl md:text-4xl font-bold text-center mb-4 text-red-500">
            Terms and Conditions
          </h1>
          <p className="text-lg pb-5">
            Following are the terms and conditions of
            <span className="text-mlmSky font-bold"> Opus Global</span>. It’s necessary
            to read all of them for clarity.
          </p>
        </div>
        <div className="pb-5">
          <ul className='md:hidden'>
            {listItems.slice(0, showMore ? listItems.length : initialItemCount).map((item, index) => (
              <li key={index} className="list-disc pb-4">
                <p className="text-base">{item}</p>
              </li>
            ))}
          </ul>
          <ul className='hidden md:block'>
            {listItems.map((item, index) => (
              <li key={index} className="list-disc pb-4">
                <p className="text-base">{item}</p>
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
  );
};

export default TermsAndConditions;
