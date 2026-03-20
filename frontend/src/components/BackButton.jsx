import React from "react";
import { ChevronLeft } from "lucide-react";

function BackButton({ className = "" }) {
  return (
    <button>
      <ChevronLeft className={`text-black ${className}`} />
    </button>
  );
}

export default BackButton;
