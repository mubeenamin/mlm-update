import UserView from "@/app/component/userView";
import axios from "axios";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  Balances: {
    balance: string;
    package: string;
  };
  country: string;
  city: string;
  referrals: Array<{ referred_user_id: number }>;
}
async function getData() {
  try {
    const response = await axios.get(
      `${process.env.ACCESS_LOGIN_URL}/api/routers/user/me`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function AllAccountHistory() {
  const data: User[] = await getData();

  return (
    <div>
      <UserView data={data} />
    </div>
  );
}
