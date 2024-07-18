"use client";

import { Axios } from "@/utils/AxiosConfig";
import Cookies from "js-cookie";

export const CheckAuth = async () => {
  // get token from cookies

  const token = Cookies.get("fl-admin-token");

  if (!token) return { verified: false };

  // the header of the request

  const headers = {
    "fataluck-admin-token": token,
  };

  try {
    const isAuth = await Axios.get("/admin/check-auth", { headers });

    const data = await isAuth.data;

    return data;
  } catch (error) {
    console.log(error);

    return { verified: false };
  }
};
