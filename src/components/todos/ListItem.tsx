import React, { useState } from "react";
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
import { TodoContext } from "@/store/TodoContext";
import { useContext } from "react";
import { ThreeDotsSpinner } from "../UI/LoadingSpinners";

interface propsTypes {
  todo: todoInterface;
}
const ListItem: React.FC<propsTypes> = ({ todo }) => {
  const [user] = useAuthState(auth);
  const { todos, getTodos } = useContext(TodoContext);
  const [cloading, setCloading] = useState(false);
  const [dloading, setDloading] = useState(false);

  const handleCompletion = async () => {
    try {
      setCloading(true);
      if (user?.uid) {
        await updateTodo(user.uid, { ...todo, isCompleted: !todo.isCompleted });
        if (user?.uid) {
          getTodos(user?.uid);
        }
      }
      setCloading(false);
    } catch (error: any) {
      errorToast(error?.message);
    }
  };
  const handleDeletion = async () => {
    try {
      setDloading(true);
      if (user?.uid) {
        await deleteTodo(user.uid, todo.id);
        if (user?.uid) {
          getTodos(user?.uid);
        }
      }
      setDloading(false);
    } catch (error: any) {
      errorToast(error?.message);
    }
  };

  const completionButton = todo.isCompleted ? (
    <FilledCheckIcon size={20} className="text-orange-500 " />
  ) : (
    <EmptyCheckIcon size={20} className="hover:text-orange-500" />
  );

  const isDisabled = cloading || dloading;

  return (
    <div className=" flex py-2 justify-between font-medium ">
      <button
        onClick={handleCompletion}
        className="self-center cursor-pointer mt-1 disabled:cursor-not-allowed"
        disabled={isDisabled}
      >
        {completionButton}
      </button>
      <div className="  flex justify-between ml-1">
        <div
          className={`text-slate-700 font-medium  ${
            todo.isCompleted ? "line-through" : ""
          } `}
        >
          {!cloading && !dloading && todo.text}
          {(cloading || dloading) && <ThreeDotsSpinner />}
        </div>
      </div>
      <button
        onClick={handleDeletion}
        className="hover:text-orange-500 hover:cursor-pointer ml-2  disabled:cursor-not-allowed"
        disabled={isDisabled}
      >
        <BinIcon size={20} />
      </button>
    </div>
  );
};

export default ListItem;
