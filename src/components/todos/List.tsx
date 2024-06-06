import ListItem from "./ListItem";
import { todoInterface } from "@/helpers/interfaces";

interface propsTypes {
  todos: todoInterface[] | [];
  fetchTodos:()=>void
}

export default function List({ todos, fetchTodos }: propsTypes) {
  return (
    <div className="flex flex-col mx-5 ">
      {todos?.map((todo) => (
        <ListItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />
      ))}
    </div>
  );
}
