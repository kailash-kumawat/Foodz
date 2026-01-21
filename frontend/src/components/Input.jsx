import React from "react";

const Input = React.forwardRef(
  ({ className = "", error, label, ...props }, ref) => {
    return (
      <div className="w-[314px] flex flex-col gap-1">
        {label && (
          <label className="text-sm font-semibold text-black/40">{label}</label>
        )}
        <input
          ref={ref}
          {...props}
          className={`h-[59px]
            px-4
            rounded-[30px]
            border
            ${error ? "border-red-500" : "border-gray-300"}
            focus:outline-none
            focus:ring-1
            focus:ring-[#FA4A0C]
            ${className}`}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  },
);

export default Input;
