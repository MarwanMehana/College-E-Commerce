"use server";

// API
import axios from "axios";

// token
import { getMyToken } from "../../utilities/token";

export const RemoveProductWishlistActions = async (id:string) => {
  const token = await getMyToken();
 if (!token) window.location.href = "/login";

  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      headers: {
        token,
      },
    }
  );

  return data;
};
