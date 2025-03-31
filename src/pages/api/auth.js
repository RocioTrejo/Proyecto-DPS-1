// pages/api/auth.js — Simulación de autenticación básica por roles

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Lista de usuarios simulada (puedes reemplazar esto por base de datos o Firestore)
    const users = [
      {
        id: 1,
        name: 'Administrador',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'Administrador'
      },
      {
        id: 2,
        name: 'Gerente Proyectos',
        email: 'gerente@example.com',
        password: 'gerente123',
        role: 'Gerente'
      },
      {
        id: 3,
        name: 'Usuario General',
        email: 'usuario@example.com',
        password: 'usuario123',
        role: 'Usuario'
      }
    ];

    // Buscar si el usuario existe y coincide la contraseña
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      return res.status(200).json({
        user: {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role
        }
      });
    }

    // Credenciales incorrectas
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Método no permitido
  return res.status(405).json({ message: 'Método no permitido' });
}