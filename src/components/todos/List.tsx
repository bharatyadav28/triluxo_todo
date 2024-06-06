import ListItem from "./ListItem";
import { todoInterface } from "@/helpers/interfaces";

interface propsTypes {
  todos: todoInterface[] | [];
}

export default function List({ todos }: propsTypes) {
  return (
    <div className="flex flex-col mx-5 ">
      {todos?.map((todo) => (
        <ListItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
