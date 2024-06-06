"use client";
import React, { useState, ReactNode } from "react";

interface propsTypes {
  text: string;
  position: string;
  children: ReactNode;
  uid: string | undefined;
}

export default function Tooltip({ text, position, children, uid }: propsTypes) {
  const [isVisible, setIsVisible] = useState(false);

  let logged = false;

  if (uid) {
    logged = true;
  }

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  const displayTip = !logged && isVisible;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {displayTip && (
        <div
          className={`absolute z-10 py-2 px-3 bg-gray-800 text-white text-sm rounded-full  ${position}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
