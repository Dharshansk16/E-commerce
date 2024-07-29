import { format } from "path";

const formatCurrency = (amount: number): string => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const formatNumber = (number: number): string => {
  return Intl.NumberFormat("en-IN").format(number);
};

export { formatNumber, formatCurrency };
