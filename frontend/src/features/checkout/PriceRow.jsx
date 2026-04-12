import React from "react";
import { IndianRupee } from "lucide-react";

function PriceRow({ name, amount, className = "" }) {
  return (
    <div className={className}>
      <p>{name}</p>
      <span className="ml-auto flex items-center">
        <IndianRupee size={10} />
        <p>{amount}</p>
      </span>
    </div>
  );
}

export default PriceRow;
