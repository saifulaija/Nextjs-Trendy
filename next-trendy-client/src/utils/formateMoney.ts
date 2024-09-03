
import { formatDistanceToNowStrict } from "date-fns";

export const formateMoney = (amount: number) => {
  
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
  }).format(amount);
};

export const formateDate = (from: Date) => {
  return formatDistanceToNowStrict(from, { addSuffix: true });
};
