"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TodoContextProvider from "@/store/TodoContextProvider";

const LayoutWrapper = ({ children }: { children: any }) => {
  return (
    <>
      <TodoContextProvider>
        <ToastContainer position="top-center" />
        {children}
      </TodoContextProvider>
    </>
  );
};

export default LayoutWrapper;
