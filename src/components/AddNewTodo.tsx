import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import Tooltip from "./Tooltip";
import { addTodo } from "@/app/actions";
import { auth } from "../app/firebase/config";
import { errorToast } from "@/helpers/toasts";

interface propsType {
  fetchTodos: () => void;
}

const AddNewTodo: React.FC<propsType> = ({ fetchTodos }) => {
  const todoInputRef = useRef<HTMLInputElement>(null);
  const [user, loading, error] = useAuthState(auth);
  const uid = user?.uid;

  let notLogged = !uid;

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todoValue = todoInputRef?.current?.value.trim();
    if (todoValue && uid) {
      try {
        const result = await addTodo(uid, todoValue);
        fetchTodos();
      } catch (error: any) {
        errorToast(error.message);
      }
    }
    if (todoInputRef?.current?.value) {
      todoInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col items-center mt-3"
    >
      <input
        type="text"
        ref={todoInputRef}
        placeholder="Add your task"
        className=" font-medium w-10/12 px-4 py-4 text-sm bg-slate-200 text-slate-600 outline-none rounded-full   "
      />
      <Tooltip text="login first!" position="top-20 left-3 " uid={uid}>
        <input
          type="submit"
          value="ADD"
          disabled={notLogged}
          className=" mt-3  px-10 py-3 text-sm font-semibold  outline-none bg-orange-500 hover:bg-orange-600 transition text-white  rounded-full cursor-pointer disabled:cursor-not-allowed "
        />
      </Tooltip>
    </form>
  );
};

export default AddNewTodo;
