const { validationResult } = require("express-validator");

// Simulación de base de datos para tareas
let tasks = [];

// Crear una nueva tarea
exports.createTask = (req, res) => {
  const { title, description } = req.body;

  // Validar errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newTask = {
    id: tasks.length + 1,
    user: req.user.email, // Asociar la tarea al usuario autenticado
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Obtener todas las tareas del usuario autenticado
exports.getTasks = (req, res) => {
  const userTasks = tasks.filter((task) => task.user === req.user.email);
  res.json(userTasks);
};

// Actualizar tarea
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = tasks.find((t) => t.id == id && t.user === req.user.email);
  if (!task) {
    return res.status(404).json({ msg: "Tarea no encontrada" });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.completed = completed !== undefined ? completed : task.completed;

  res.json(task);
};

// Eliminar tarea
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  tasks = tasks.filter((t) => t.id != id || t.user !== req.user.email);
  res.json({ msg: "Tarea eliminada" });
};