"use client";
import React from "react";
import ReplyMsg from "./replyMsg";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { Receipt } from "lucide-react";
import ViewMessage from "./viewMessage";

function GetFund() {
  

  return (
    <main>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full rounded-xl">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Amount Sent
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Amount Received
                    </th>
                   
                  </tr>
                </thead>
               
                  <tbody>
                    <tr>
                      <td
                        className="p-5 text-center text-xl leading-6 font-medium text-[#9CA3AF]"
                        colSpan={4}
                      >
                        No fund found
                        <div className="flex justify-center">
                          <Receipt
                            color="#9CA3AF"
                            size={100}
                            className="justify-center"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                
            
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GetFund;
