import React, { useState } from 'react';
import ProtectedRoute from '@components/Auth/Shared/ProtectedRoute';
import { ROLES } from 'src/utils/roles';
import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';
import styles from '@styles/admin.module.css';
import { getUsers, addUser, updateUser, deleteUser } from 'src/services/userService';

export default function AdminPage() {
  const [users, setUsers] = useState(getUsers());
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUsername, setNewUsername] = useState('');

  const { logout } = useAuth();
  const router = useRouter();

  const handleAddUser = () => {
    const newUser = { id: Date.now(), username: `user${users.length + 1}`, role: 'Usuario' };
    addUser(newUser);
    setUsers(getUsers());
  };

  const handleEditUser = (id, newRole) => {
    updateUser(id, { role: newRole });
    setUsers(getUsers());
  };

  const handleDeleteUser = (id) => {
    deleteUser(id);
    setUsers(getUsers());
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const startEditingUser = (id, currentUsername) => {
    setEditingUserId(id);
    setNewUsername(currentUsername);
  };

  const saveUsername = (id) => {
    updateUser(id, { username: newUsername });
    setUsers(getUsers());
    setEditingUserId(null);
    setNewUsername('');
  };

  return (
    <ProtectedRoute requiredRole={ROLES.ADMIN}>
      {/* Header superior */}
      <header className={styles.header}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Cerrar Sesión
        </button>
      </header>

      <div className={styles.adminContainer}>
        <h1 className={styles.title}>Panel de Administración</h1>
        <h2 className={styles.subtitle}>Gestión de Usuarios</h2>
        <button onClick={handleAddUser} className={styles.addButton}>
          Agregar Usuario
        </button>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.id} className={styles.userItem}>
              {editingUserId === user.id ? (
                <div className={styles.editContainer}>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className={styles.inputField}
                  />
                  <button onClick={() => saveUsername(user.id)} className={styles.saveButton}>
                    Guardar
                  </button>
                  <button onClick={() => setEditingUserId(null)} className={styles.cancelButton}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className={styles.userInfo}>
                  <span>
                    {user.username} - {user.role}
                  </span>
                  <div className={styles.actionButtons}>
                    <button onClick={() => startEditingUser(user.id, user.username)} className={styles.editButton}>
                      Editar Nombre
                    </button>
                    <button onClick={() => handleEditUser(user.id, 'Administrador')} className={styles.editButton}>
                      Hacer Admin
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} className={styles.deleteButton}>
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}