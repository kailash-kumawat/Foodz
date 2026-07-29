import React from "react";
import { IndianRupee } from "lucide-react";

function PriceRow({ name, amount, hide, className = "" }) {
  return (
    <div className={className}>
      <p>{name}</p>
      <span className="ml-auto flex items-center">
        <IndianRupee size={10} className={`${hide}`} />
        <p>{amount}</p>
      </span>
    </div>
  );
}

export default PriceRow;
