"use client";
import { BsCardList as ListIcon } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import AddNewTodo from "../components/AddNewTodo";
import Card from "../components/UI/Card";
import List from "../components/todos/List";
import { todoInterface } from "../helpers/interfaces";
import NavOption from "../components/NavOption";

import { auth } from "./firebase/config";
import { errorToast } from "@/helpers/toasts";
import { TodoContext } from "@/store/TodoContext";
import { useContext } from "react";
import { TriangleSpinner } from "@/components/UI/LoadingSpinners";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const { todos, getTodos, error, setError, isFetching } =
    useContext(TodoContext);

  useEffect(() => {
    if (user?.uid) {
      getTodos(user?.uid);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      errorToast(error);
      setError("");
    }
  });

  const pendingTodos: todoInterface[] = todos?.filter(
    (todo) => todo.isCompleted === false
  );
  const completedTodos: todoInterface[] = todos?.filter(
    (todo) => todo.isCompleted === true
  );

  return (
    <>
      <NavOption userId={user?.uid} email={user?.email} />
      <Card className="bg-transparent mt-6">
        <div className="font-bold text-2xl mb-5 flex align-middle">
          <h1 className="mr-2 ml-4">To-do List </h1>
          <ListIcon className="mt-1 text-orange-300" />
        </div>

        <AddNewTodo />
        <div className="flex-col  mt-8 mx-1">
          {!isFetching && (
            <>
              <List todos={pendingTodos} />
              <hr className="pt-2 mt-3 mr-5 mb-0 " />
              <List todos={completedTodos} />{" "}
            </>
          )}
          {isFetching && <TriangleSpinner />}
        </div>
      </Card>
    </>
  );
}
