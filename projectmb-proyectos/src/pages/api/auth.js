export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validación básica (debes implementar tu propia lógica)
    if (email === 'admin@example.com' && password === 'admin123') {
      return res.status(200).json({
        user: {
          id: 1,
          name: 'Administrador',
          email: 'admin@example.com',
          role: 'admin'
        }
      });
    }

    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  return res.status(405).json({ message: 'Método no permitido' });
}