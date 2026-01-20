import React from "react";

function Button({
  children,
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const isDisabled = loading || disabled;
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : props.onClick}
      className={`w-78.5 h-17.5
        rounded-[30px]
      bg-[#FA4A0C]
      text-white font-medium
        flex items-center justify-center
        transition 
        ${isDisabled ? "opacity-60 cursor-not-allowed" : "active:scale-[0.98]"}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;
