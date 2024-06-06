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
import useHttp from "@/hooks/use-http";
import { errorToast } from "@/helpers/toasts";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [todos, setTodos] = useState<todoInterface[] | []>([]);
  const [refetch, setRefetch] = useState(true);

  const { dbConnect, isLoading, error: fetchError, setError } = useHttp();

  useEffect(() => {
    const postRequest = (data: any) => {
      if (data) {
        setTodos(data.todos);
      }
    };
    if (user?.uid && refetch) {
      dbConnect({ path: `/api/todos?uid=${user.uid}` }, postRequest);
      setRefetch(false);
    } else if (!user?.uid && refetch) {
      setTodos([]);
    }
  }, [user, refetch]);

  useEffect(() => {
    if (fetchError) {
      errorToast(fetchError);
      setError(null);
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
      <NavOption
        userId={user?.uid}
        email={user?.email}
        fetchTodos={() => {
          setRefetch(true);
        }}
      />
      <Card className="bg-transparent mt-6">
        <div className="font-bold text-2xl mb-5 flex align-middle">
          <h1 className="mr-2 ml-4">To-do List </h1>
          <ListIcon className="mt-1 text-orange-300" />
        </div>

        <AddNewTodo
          fetchTodos={() => {
            setRefetch(true);
          }}
        />
        <div className="flex-col  mt-8 mx-1">
          <List
            todos={pendingTodos}
            fetchTodos={() => {
              setRefetch(true);
            }}
          />
          <hr className="pt-2 mt-3 mr-5 mb-0 " />

          <List
            todos={completedTodos}
            fetchTodos={() => {
              setRefetch(true);
            }}
          />
        </div>
      </Card>
    </>
  );
}
