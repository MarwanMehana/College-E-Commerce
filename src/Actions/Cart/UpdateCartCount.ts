"use server";

// API
import axios from "axios";

// token
import { getMyToken } from "../../utilities/token";

export const UpdateCartCountActions = async (id: string, count: string) => {
  const token = await getMyToken();
 if (!token) window.location.href = "/login";

  const { data } = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { count },
    {
      headers: {
        token,
      },
    }
  );

  return data;
};
