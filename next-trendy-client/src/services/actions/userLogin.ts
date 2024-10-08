// "use server";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { jwtDecode } from "jwt-decode";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      // cache: "no-store",
      credentials: "include",
    }
  );
  const userInfo = await res.json();
  if (!res.ok) {
    throw new Error(userInfo.message || "An unexpected error occurred.");
  }

  const userData = jwtDecode(userInfo?.data?.accessToken) as any;
  const needPasswordChanged = userInfo?.data?.passwordChangeRequired;
  const role = userData?.role;
  const lowerCaseRole = role.toLowerCase();
  if (userInfo?.data?.accessToken) {
    setAccessToken(userInfo?.data?.accessToken, {
      redirect: `/dashboard/${lowerCaseRole}`,
      needPasswordChanged,
      role,
    });
  }
  return userInfo;
};
