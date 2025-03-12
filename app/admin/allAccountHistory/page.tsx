import UserView from "@/app/component/userView";
import axios from "axios";

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
  const data = await getData();

  return (
    <div>
      <UserView data={data} />
    </div>
  );
}
