import axios from "axios";

const BASE_URL = "https://mockend.com/learningmachine00/testAPI/Device";

export async function fetchDevices() {
  const response = await axios.get(BASE_URL);
  return response.data;
}
