import { Router } from "express";

const router = Router();
const todos = [
  {
    id: 1,
    name: "Todo 1",
    completed: false,
  },
  {
    id: 2,
    name: "Todo 2",
    completed: false,
  },
  {
    id: 3,
    name: "Todo 3",
    completed: false,
  },
];

router.get("/", (req, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  const newTodo = req.body;
  if (newTodo.name) {
    todos.push(newTodo);
    res.status(201).send("todo created");
  } else {
    res.status(400).send("Missing required field");
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    res.status(404).send("todo not found");
  } else {
    todos.splice(todoIndex, 1);
    res.send("todo deleted");
  }
});

router.put("/:id", (req, res) => {
  const { name } = req.body;
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (!name) {
    return res.status(400).send("Request body must contain name");
  }
  if (todoIndex === -1) {
    return res.status(404).send("todo not found");
  } else {
    todos[todoIndex].name = name;
    todos[todoIndex].completed =
      req.body.completed ?? todos[todoIndex].completed;
    res.send("todo was updated");
  }
});

export default router;
