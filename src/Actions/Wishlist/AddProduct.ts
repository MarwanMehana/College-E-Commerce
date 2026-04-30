"use server";

// API
import axios from "axios";

// token
import { getMyToken } from "../../utilities/token";

export const AddToWishlistActions = async (id: string) => {
  const token = await getMyToken();
 if (!token) window.location.href = "/login";

  const values = {
    productId: id,
  };
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    values,
    {
      headers: {
        token,
      },
    }
  );

  return data;
};
