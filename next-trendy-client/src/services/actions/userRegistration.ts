import { FieldValues } from "react-hook-form";



export const userRegistration = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/create-user`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  const subscriberInfo = await res.json();
  if (!res.ok) {
    throw new Error(subscriberInfo.message || "An unexpected error occurred.");
  }

  return subscriberInfo;
};

