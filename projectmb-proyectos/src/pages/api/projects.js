// Base de datos simulada
let projects = [
    {
      id: 1,
      name: "Sistema de Gestión",
      description: "Desarrollo de un sistema de gestión de proyectos",
      manager: "admin@example.com",
      team: ["user1@example.com", "user2@example.com"],
      status: "en progreso",
      createdAt: new Date().toISOString()
    }
  ]
  
  export default function handler(req, res) {
    switch (req.method) {
      case 'GET':
        return res.status(200).json(projects)
        
      case 'POST':
        const newProject = {
          id: projects.length + 1,
          ...req.body,
          createdAt: new Date().toISOString()
        }
        projects.push(newProject)
        return res.status(201).json(newProject)
        
      case 'PUT':
        const { id, ...updatedData } = req.body
        projects = projects.map(project => 
          project.id === id ? { ...project, ...updatedData } : project
        )
        return res.status(200).json(projects.find(p => p.id === id))
        
      case 'DELETE':
        projects = projects.filter(project => project.id !== req.body.id)
        return res.status(200).json({ message: 'Proyecto eliminado' })
        
      default:
        return res.status(405).json({ message: 'Método no permitido' })
    }
  }