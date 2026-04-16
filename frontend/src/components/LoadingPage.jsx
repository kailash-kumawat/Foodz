import React, { useEffect } from "react";

// TODO complete this after start page
function LoadingPage({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return <div>Loading</div>;
}

export default LoadingPage;
