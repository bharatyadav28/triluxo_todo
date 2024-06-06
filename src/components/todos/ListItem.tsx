import React from "react";
import { BsX as BinIcon } from "react-icons/bs";
import {
  BsFillCheckCircleFill as FilledCheckIcon,
  BsCheckCircle as EmptyCheckIcon,
} from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";

import { todoInterface } from "@/helpers/interfaces";
import { errorToast } from "@/helpers/toasts";
import { deleteTodo, updateTodo } from "@/app/actions";
import { auth } from "../../app/firebase/config";

interface propsTypes {
  todo: todoInterface;
  fetchTodos: () => void;
}
const ListItem: React.FC<propsTypes> = ({ todo, fetchTodos }) => {
  const [user] = useAuthState(auth);

  const handleCompletion = async () => {
    try {
      if (user?.uid) {
        await updateTodo(user.uid, { ...todo, isCompleted: !todo.isCompleted });
        fetchTodos();
      }
    } catch (error: any) {
      errorToast(error?.message);
    }
  };
  const handleDeletion = async () => {
    try {
      if (user?.uid) {
        await deleteTodo(user.uid, todo.id);
        fetchTodos();
      }
    } catch (error: any) {
      errorToast(error?.message);
    }
  };

  return (
    <div className=" flex py-2 justify-between font-medium ">
      <div
        onClick={handleCompletion}
        className="self-center cursor-pointer mt-1"
      >
        {todo.isCompleted ? (
          <FilledCheckIcon size={20} className="text-orange-500 " />
        ) : (
          <EmptyCheckIcon size={20} className="hover:text-orange-500" />
        )}
      </div>
      <div className="  flex justify-between ml-1">
        <div
          className={`text-slate-700 font-medium  ${
            todo.isCompleted ? "line-through" : ""
          } `}
        >
          {todo.text}
        </div>
      </div>
      <div
        onClick={handleDeletion}
        className="hover:text-orange-500 hover:cursor-pointer ml-2 "
      >
        <BinIcon size={20} />
      </div>
    </div>
  );
};

export default ListItem;
