import bcrypt from 'bcryptjs'

// Base de datos simulada
let users = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  }
]

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // No devolver las contraseñas
      const usersWithoutPasswords = users.map(user => {
        const { password, ...rest } = user
        return rest
      })
      return res.status(200).json(usersWithoutPasswords)
      
    case 'POST':
      const { name, email, password, role } = req.body
      
      if (users.some(u => u.email === email)) {
        return res.status(400).json({ message: 'El email ya está registrado' })
      }
      
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: role || 'member'
      }
      
      users.push(newUser)
      const { password: _, ...userWithoutPassword } = newUser
      return res.status(201).json(userWithoutPassword)
      
    case 'PUT':
      const { id, ...updatedData } = req.body
      users = users.map(user => 
        user.id === id ? { ...user, ...updatedData } : user
      )
      const updatedUser = users.find(u => u.id === id)
      const { password: __, ...updatedUserWithoutPassword } = updatedUser
      return res.status(200).json(updatedUserWithoutPassword)
      
    case 'DELETE':
      users = users.filter(user => user.id !== req.body.id)
      return res.status(200).json({ message: 'Usuario eliminado' })
      
    default:
      return res.status(405).json({ message: 'Método no permitido' })
  }
}