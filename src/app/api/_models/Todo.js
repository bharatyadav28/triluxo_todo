import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const TodosSchema = mongoose.Schema({
  uid: {
    type: "string",

    required: [true, "Todo user cannot be empty"],
  },
  todos: [todoSchema],
});

const TodosModel =
  mongoose.models.todos || mongoose.model("todos", TodosSchema);

export default TodosModel;
