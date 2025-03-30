import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@context/AuthContext';
import styles from '@styles/auth.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica de autenticación aquí
      await login({ email, name: 'Usuario Ejemplo' });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error de login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}