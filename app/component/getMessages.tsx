"use client";
import React from "react";
import ReplyMsg from "./replyMsg";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { Mail } from "lucide-react";

function GetMessages({ message_data }: any) {
  const deletMsg = async (message_id: any) => {
    try {
      const res = await axios.delete(
        `/api/routers/message/delete_message_by_id/${message_id}`
      );

      if (!res) {
        throw new Error(`HTTP error! status:`);
      } else {
        toast("Message deleted successfully", { type: "success" });
      }
    } catch {
      console.error("An error occurred:");
    }
  };

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
                      User ID
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      User Email
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                {message_data.length === 0 ? (
                  <tbody>
                    <tr>
                      <td
                        className="p-5 text-center text-xl leading-6 font-medium text-[#9CA3AF]"
                        colSpan={4}
                      >
                        Message not found
                        <div className="flex justify-center">
                          <Mail
                            color="#9CA3AF"
                            size={100}
                            className="justify-center"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  message_data
                    .slice(0)
                    .reverse()
                    .map((message: any) => (
                      <tbody
                        className="divide-y divide-gray-300"
                        key={message.id}
                      >
                        <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {message.sender_id}
                          </td>
                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {message.email}
                          </td>
                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {message.content}
                          </td>
                          <td className="p-5">
                            <div className="flex items-center gap-1">
                              <ReplyMsg message_id={message.sender_id} />
                              <button
                                className="p-2 rounded-full group transition-all duration-500 flex item-center"
                                onClick={() => deletMsg(message.id)}
                              >
                                <MdDeleteSweep
                                  size={26}
                                  className="text-red-500"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GetMessages;
