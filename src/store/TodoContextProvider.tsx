import React, { useState, ReactNode, useEffect } from "react";

import { todoInterface } from "@/helpers/interfaces";
import useHttp from "@/hooks/use-http";
import { TodoContext } from "./TodoContext";

interface PropsType {
  children: ReactNode;
}

const TodoContextProvider: React.FC<PropsType> = ({ children }) => {
  const [todos, setTodos] = useState<todoInterface[] | []>([]);
  const { dbConnect, isLoading: isFetching, error, setError } = useHttp();

  const getTodos = async (userId: string) => {
    const postRequest = (data: any) => {
      if (data) {
        setTodos(data.todos);
      }
    };

    await dbConnect({ path: `/api/todos?uid=${userId}` }, postRequest);
  };

  const emptyTodos = () => {
    setTodos([]);
  };

  return (
    <TodoContext.Provider
      value={{ todos, getTodos, isFetching, error, setError, emptyTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
