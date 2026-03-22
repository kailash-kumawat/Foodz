import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BackButton({ className = "" }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`cursor-pointer${className}`}
    >
      <ChevronLeft />
    </button>
  );
}

export default BackButton;
