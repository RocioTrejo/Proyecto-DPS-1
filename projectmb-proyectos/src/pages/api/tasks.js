// Base de datos simulada
let tasks = [
    {
      id: 1,
      title: "Implementar autenticación",
      description: "Crear sistema de login y registro",
      projectId: 1,
      assignedTo: "user1@example.com",
      status: "en progreso",
      dueDate: "2023-12-15",
      createdAt: new Date().toISOString()
    }
  ]
  
  export default function handler(req, res) {
    const { userEmail } = req.query
  
    switch (req.method) {
      case 'GET':
        if (userEmail) {
          const userTasks = tasks.filter(task => task.assignedTo === userEmail)
          return res.status(200).json(userTasks)
        }
        return res.status(200).json(tasks)
        
      case 'POST':
        const newTask = {
          id: tasks.length + 1,
          ...req.body,
          createdAt: new Date().toISOString()
        }
        tasks.push(newTask)
        return res.status(201).json(newTask)
        
      case 'PUT':
        const { id, ...updatedData } = req.body
        tasks = tasks.map(task => 
          task.id === id ? { ...task, ...updatedData } : task
        )
        return res.status(200).json(tasks.find(t => t.id === id))
        
      case 'DELETE':
        tasks = tasks.filter(task => task.id !== req.body.id)
        return res.status(200).json({ message: 'Tarea eliminada' })
        
      default:
        return res.status(405).json({ message: 'Método no permitido' })
    }
  }