// dailyupdate-trigger.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("/api/routers/dailyupdate");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
}
