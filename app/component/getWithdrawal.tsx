import { Mail } from "lucide-react";
import { MdEdit } from "react-icons/md";
import UpdateWithdrawal from "./updateWithdrawal";

function GetWithdrawal({ withdraw_data }: any) {
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
                      User Id
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      National Id/ Passport
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Bank Name
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      IBan
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                {withdraw_data.length === 0 ? (
                  <tbody>
                    <tr>
                      <td
                        className="p-5 text-center text-xl leading-6 font-medium text-[#9CA3AF]"
                        colSpan={11}
                      >
                        <div className="flex justify-center">
                          <div>
                            Withdrawal not found
                            <div className="flex justify-center">
                              <Mail
                                color="#9CA3AF"
                                size={100}
                                className="justify-center"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  withdraw_data
                    .slice(0)
                    .reverse()
                    .map((withdraw: any) => (
                      <tbody
                        className="divide-y divide-gray-300 text-center"
                        key={withdraw.id}
                      >
                        <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {withdraw.user_id}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {withdraw.firstName}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {withdraw.lastName}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {withdraw.idNumber}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {withdraw.country}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {withdraw.bankName}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {withdraw.contact}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {withdraw.iban}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {withdraw.withdrawal_amount}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {withdraw.status}
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <UpdateWithdrawal withdrawal_id={withdraw.id} />
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

export default GetWithdrawal;
