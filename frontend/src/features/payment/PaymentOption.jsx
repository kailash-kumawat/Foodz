import React from "react";

function PaymentOption({
  icon: Icon,
  value,
  selected,
  bgColor,
  onChange,
  title,
}) {
  return (
    <label className="flex items-center cursor-pointer py-5">
      <input
        className="w-5 h-5"
        type="radio"
        checked={selected}
        onChange={() => onChange(value)}
      />
      <div
        className={`ml-6 w-14 h-14 rounded-xl flex items-center justify-center ${bgColor}`}
      >
        <Icon size={24} className="text-white " />
      </div>
      <span className="ml-5 text-xl font-medium">{title}</span>
    </label>
  );
}

export default PaymentOption;
