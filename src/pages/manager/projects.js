// index.js - Panel de Administración con gestión de usuarios y creación de proyectos en Firebase

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@components/Auth/Shared/ProtectedRoute';
import { ROLES } from 'src/utils/roles';
import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';
import styles from '@styles/admin.module.css';

import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from 'src/services/userService';
import {
  getProjects,
  addProject,
  updateProject, 
  deleteProject
} from 'src/services/projectService';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('Usuario');
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState('');
  const [editedProjectUsers, setEditedProjectUsers] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userList = await getUsers();
      const projectList = await getProjects();
      setUsers(userList);
      setProjects(projectList);
    };
    fetchData();
  }, []);

  const handleAddUser = async () => {
    if (!newUsername.trim() || !newPassword.trim() || !newRole) return;
    const newUser = { username: newUsername, password: newPassword, role: newRole };
    await addUser(newUser);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
    setNewUsername('');
    setNewPassword('');
    setNewRole('Usuario');
  };

  const handleAddProject = async () => {
    if (!newProjectName.trim()) return;
    await addProject({ name: newProjectName, createdAt: new Date(), users: selectedUsers });
    const updatedProjects = await getProjects();
    setProjects(updatedProjects);
    setNewProjectName('');
    setSelectedUsers([]);
  };

  const handleUpdateProject = async (id) => {
    if (!editedProjectName.trim()) return;
    await updateProject(id, {
      name: editedProjectName,
      users: editedProjectUsers
    });
    const updatedProjects = await getProjects();
    setProjects(updatedProjects);
    setEditingProjectId(null);
    setEditedProjectName('');
    setEditedProjectUsers([]);
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      const updatedProjects = await getProjects();
      setProjects(updatedProjects);
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  };

  const handleEditUser = async (id, newRole) => {
    await updateUser(id, { role: newRole });
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const startEditingUser = (id, currentUsername) => {
    setEditingUserId(id);
    setNewUsername(currentUsername);
  };

  const saveUsername = async (id) => {
    await updateUser(id, { username: newUsername });
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
    setEditingUserId(null);
    setNewUsername('');
  };

  const handleUserSelect = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selected = options.map(option => option.value);
    setSelectedUsers(selected);
  };

  const handleEditProjectUserSelect = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selected = options.map(option => option.value);
    setEditedProjectUsers(selected);
  };

  return (
    <ProtectedRoute requiredRole={ROLES.MANAGER}>
      <header className={styles.header}>
        <button onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</button>
      </header>

      <div className={styles.adminContainer}>
        <h1 className={styles.title}>Panel Gerencial</h1>

        {/* Sección: Proyectos */}
        <h2 className={styles.subtitle}>Proyectos</h2>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Nombre del Proyecto"
          className={styles.inputField}
        />
        <button onClick={() => setShowUserList(!showUserList)} className={styles.toggleButton}>
          {showUserList ? 'Ocultar Usuarios' : 'Seleccionar Usuarios'}
        </button>
        {showUserList && (
          <select
            multiple
            value={selectedUsers}
            onChange={handleUserSelect}
            className={styles.inputField}
          >
            {users.map((user) => (
              <option key={user.id} value={user.username}>
                {user.username} - {user.role}
              </option>
            ))}
          </select>
        )}
        <button onClick={handleAddProject} className={styles.addButton}>Crear Proyecto</button>

        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              {editingProjectId === project.id ? (
                <>
                  <input
                    type="text"
                    value={editedProjectName}
                    onChange={(e) => setEditedProjectName(e.target.value)}
                    className={styles.inputField}
                  />
                  <select
                    multiple
                    value={editedProjectUsers}
                    onChange={handleEditProjectUserSelect}
                    className={styles.inputField}
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.username}>
                        {user.username} - {user.role}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleUpdateProject(project.id)} className={styles.saveButton}>Guardar Cambios</button>
                  <button onClick={() => setEditingProjectId(null)} className={styles.cancelButton}>Cancelar</button>
                </>
              ) : (
                <>
                  <h3>{project.name}</h3>
                  <p>Creado el {new Date(project.createdAt.seconds * 1000).toLocaleDateString()}</p>
                  <p><strong>Usuarios asignados:</strong> {project.users?.join(', ') || 'Ninguno'}</p>
                  <button
                    onClick={() => {
                      setEditingProjectId(project.id);
                      setEditedProjectName(project.name);
                      setEditedProjectUsers(project.users || []);
                    }}
                    className={styles.editButton}
                  >Editar</button>
                  <button onClick={() => setConfirmDeleteId(project.id)} className={styles.deleteButton}>Eliminar</button>

                  {confirmDeleteId === project.id && (
                    <div className={styles.confirmModal}>
                      <p>¿Estás seguro que deseas eliminar este proyecto?</p>
                      <div className={styles.actionButtons}>
                        <button onClick={() => handleDeleteProject(project.id)} className={styles.deleteButton}>Confirmar</button>
                        <button onClick={() => setConfirmDeleteId(null)} className={styles.cancelButton}>Cancelar</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}