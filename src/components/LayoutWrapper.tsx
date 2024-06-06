"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LayoutWrapper = ({ children }: { children: any }) => {
  return (
    <>
      <ToastContainer position="top-center" />
      {children}
    </>
  );
};

export default LayoutWrapper;
