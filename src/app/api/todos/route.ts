import { type NextRequest } from "next/server";

import dbConnect from "../../../helpers/dbConnect";
import TodoModel from "../_models/Todo";
import { todoInterface } from "@/helpers/interfaces";

const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    const text = await request.json();

    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get("uid");
    const id = Number(Math.floor(Math.random() * (1000 - 10) + 10));

    const todo = {
      id,
      text,
    };

    if (!uid || !todo) {
      return Response.json(
        { msg: "Please provide all details" },
        { status: 400 }
      );
    }

    const todosExist = await TodoModel.findOne({ uid });

    if (todosExist) {
      todosExist.todos = [...todosExist.todos, todo];
      await todosExist.save();
      return Response.json({ todos: todosExist.todos }, { status: 200 });
    }

    const { todos: savedTodos } = await TodoModel.create({
      todos: [todo],
      uid,
    });

    return Response.json({ msg: "Todo created successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error }, { status: 500 });
  }
};

const DELETE = async (request: NextRequest) => {
  try {
    await dbConnect();
    const data = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get("uid");

    const { todoId } = data;

    if (!uid || !todoId) {
      return Response.json(
        { msg: "Please provide all details" },
        { status: 400 }
      );
    }

    const todosExist = await TodoModel.findOne({ uid });

    if (todosExist) {
      const newTodos = todosExist.todos.filter((item: todoInterface) => {
        if (item.id !== todoId) {
          return item;
        }
      });
      todosExist.todos = newTodos;
      await todosExist.save();
      return Response.json(
        { message: "Todo deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error }, { status: 500 });
  }
};

const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();
    const data = await request.json();

    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get("uid");

    const todo = data;

    if (!uid || !todo) {
      return Response.json(
        { msg: "Please provide all details" },
        { status: 400 }
      );
    }

    const todosExist = await TodoModel.findOne({ uid });

    if (todosExist) {
      const newTodos = todosExist.todos.filter((item: todoInterface) => {
        return item.id !== todo.id;
      });

      todosExist.todos = [...newTodos, todo];
      await todosExist.save();
      return Response.json(
        { msg: "Todo updated successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error }, { status: 500 });
  }
};

const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get("uid");

    if (!uid) {
      return Response.json({ msg: "Please provide user id" }, { status: 400 });
    }
    const todosData = await TodoModel.findOne({ uid });
    if (!todosData) {
      return Response.json({ msg: "No todo found" }, { status: 404 });
    }

    return Response.json(todosData, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error }, { status: 500 });
  }
};

export { POST, GET, DELETE, PATCH };
