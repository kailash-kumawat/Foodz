import {
  CreditCard,
  Landmark,
  Banknote,
  Smartphone,
  Wallet,
} from "lucide-react";

export const paymentTypes = [
  {
    icon: CreditCard,
    value: "card",
    title: "Card",
    bgColor: "bg-[#FA4A0C]",
  },
  {
    icon: Banknote,
    value: "cash_on_delivery",
    title: "Cash on delivery",
    bgColor: "bg-green-500",
  },
  {
    icon: Smartphone,
    value: "upi",
    title: "UPI",
    bgColor: "bg-blue-500",
  },
  {
    icon: Landmark,
    value: "net_banking",
    title: "Net banking",
    bgColor: "bg-[#EB4796]",
  },
  {
    icon: Wallet,
    value: "wallet",
    title: "Wallet",
    bgColor: "bg-amber-500",
  },
];
