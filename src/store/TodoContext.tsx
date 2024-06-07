import { todoInterface } from "@/helpers/interfaces";
import { createContext } from "react";

interface contextType {
  todos: todoInterface[] | [];
  getTodos: (userId: string) => void;
  isFetching: boolean;
  error: string;
  setError: (error: string) => void;
  emptyTodos: () => void;
}
const defaultValue = {
  todos: [],
  getTodos: (userId: string) => {},
  isFetching: false,
  error: "",
  setError: (error: string) => {},
  emptyTodos: () => {},
};
export const TodoContext = createContext<contextType>(defaultValue);
