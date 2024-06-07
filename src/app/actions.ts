"use server";

import { todoInterface } from "@/helpers/interfaces";
import { revalidateTag, revalidatePath } from "next/cache";

export const addTodo = async (uid: string, todo: string) => {
  const result = await fetch(
    `https://triluxo-todo.vercel.app/api/todos?uid=${uid}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    }
  );
  const todosData = await result.json();
  if (!result.ok) {
    throw new Error(todosData.msg);
  }

  return todosData.todos;
};

export const deleteTodo = async (uid: string, todoId: number) => {
  const result = await fetch(
    `https://triluxo-todo.vercel.app/api/todos?uid=${uid}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoId }),
    }
  );
  const todosData = await result.json();
  if (!result.ok) {
    throw new Error(todosData.msg);
  }

  return todosData.todos;
};

export const updateTodo = async (uid: string, todoData: todoInterface) => {
  const result = await fetch(
    `https://triluxo-todo.vercel.app/api/todos?uid=${uid}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoData),
    }
  );
  const todosData = await result.json();
  if (!result.ok) {
    throw new Error(todosData.msg);
  }

  return todosData.todos;
};
