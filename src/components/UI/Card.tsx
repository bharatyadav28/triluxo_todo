import React, { ReactNode } from "react";

const Card: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const classes = `w-96 bg-white mx-auto mt-20 rounded-lg border border-gray-300 py-10 px-3 ${className} `;

  return <div className={classes}>{children}</div>;
};

export default Card;
