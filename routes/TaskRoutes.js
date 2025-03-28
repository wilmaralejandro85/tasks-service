const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Task = require('../models/Task'); // Asegúrate de importar tu modelo de tareas

router.get('/', authMiddleware, async (req, res) => {
  try {
      console.log("Buscando tareas del usuario:", req.user.userId);
      const tasks = await Task.find({ user: req.user.userId });
      console.log("Tareas encontradas:", tasks);
      res.json(tasks);
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor' });
  }
});


// Crear una nueva tarea (protegida)
router.post('/', authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  try {
      console.log("Usuario autenticado:", req.user.userId);  // Agrega este log para verificar
      const newTask = new Task({ 
          title, 
          description, 
          user: req.user.userId  // Asegura que se guarde el userId
      });

      await newTask.save();
      res.status(201).json(newTask);
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor' });
  }
});

// Eliminar una tarea (protegida)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
      const task = await Task.findById(req.params.id);

      if (!task) {
          return res.status(404).json({ msg: "Tarea no encontrada" });
      }

      // Verificar que la tarea pertenece al usuario autenticado
      if (task.user && task.user.toString() !== req.user.userId) {
          return res.status(403).json({ msg: "No autorizado para eliminar esta tarea" });
      }

      await task.deleteOne();
      res.json({ msg: "Tarea eliminada correctamente" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
  }
});


// Actualizar una tarea (protegida)
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  try {
      let task = await Task.findById(req.params.id);

      if (!task) {
          return res.status(404).json({ msg: "Tarea no encontrada" });
      }

      // Verificar que la tarea pertenece al usuario autenticado
      if (task.user && task.user.toString() !== req.user.userId) {
          return res.status(403).json({ msg: "No autorizado para actualizar esta tarea" });
      }

      // Actualizar los campos
      task.title = title || task.title;
      task.description = description || task.description;

      const updatedTask = await task.save();
      res.json(updatedTask);

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
  }
});

module.exports = router;