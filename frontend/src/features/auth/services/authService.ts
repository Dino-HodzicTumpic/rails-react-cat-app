import axios from "axios";
import { getDeviceInfo } from "../../../utils/device";

export const authenticateWithGoogle = async (id_token: string) => {
  try {
    const device_info = getDeviceInfo();
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/google_oauth/authenticate`,
      { id_token, device_info }
    );
    return response.data;
  } catch (err) {
    console.error("Google auth failed:", err);
    throw err;
  }
};
