import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '@components/Auth/Shared/ProtectedRoute';
import { ROLES } from 'src/utils/roles';
import { getUsers } from 'src/services/userService';
import styles from '@styles/projects.module.css';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectUsers, setNewProjectUsers] = useState([]);
  const [newProjectStartDate, setNewProjectStartDate] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const registeredUsers = getUsers();
      setUsers(registeredUsers);
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    router.push('/auth/login');
  };

  const handleAddProject = () => {
    if (newProjectName.trim() !== '' && newProjectStartDate.trim() !== '') {
      setProjects([
        ...projects,
        {
          id: Date.now(),
          name: newProjectName,
          startDate: newProjectStartDate,
          users: users.filter((user) => newProjectUsers.includes(user.id)),
        },
      ]);
      setNewProjectName('');
      setNewProjectStartDate('');
      setNewProjectUsers([]);
    }
  };

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  const handleEditProject = (id) => {
    const projectToEdit = projects.find((project) => project.id === id);
    setEditingProject(projectToEdit);
    setNewProjectName(projectToEdit.name);
    setNewProjectStartDate(projectToEdit.startDate);
    setNewProjectUsers(projectToEdit.users.map((user) => user.id));
  };

  const handleSaveEdit = () => {
    const updatedProjects = projects.map((project) =>
      project.id === editingProject.id
        ? {
            ...project,
            name: newProjectName,
            startDate: newProjectStartDate,
            users: users.filter((user) => newProjectUsers.includes(user.id)),
          }
        : project
    );
    setProjects(updatedProjects);
    setEditingProject(null);
    setNewProjectName('');
    setNewProjectStartDate('');
    setNewProjectUsers([]);
  };

  const toggleUserSelection = (userId) => {
    if (newProjectUsers.includes(userId)) {
      setNewProjectUsers(newProjectUsers.filter((id) => id !== userId));
    } else {
      setNewProjectUsers([...newProjectUsers, userId]);
    }
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <ProtectedRoute requiredRole={ROLES.MANAGER}>
      {/* Header superior */}
      <header className={styles.header}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Cerrar Sesión
        </button>
      </header>

      <div className={styles.managerContainer}>
        <h1 className={styles.title}>Gestión de Proyectos</h1>
        <div className={styles.projectInputContainer}>
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Nombre del Proyecto"
            className={styles.inputField}
          />
          <input
            type="datetime-local"
            value={newProjectStartDate}
            onChange={(e) => setNewProjectStartDate(e.target.value)}
            className={styles.inputField}
          />
          <div className={styles.userDropdownContainer}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className={styles.dropdownButton}
            >
              {showUserDropdown ? 'Ocultar Usuarios' : 'Seleccionar Usuarios'}
            </button>
            {showUserDropdown && (
              <ul className={styles.userDropdown}>
                {users.map((user) => (
                  <li key={user.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={newProjectUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                      />
                      {user.username}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {editingProject ? (
            <button onClick={handleSaveEdit} className={styles.saveButton}>
              Guardar Cambios
            </button>
          ) : (
            <button onClick={handleAddProject} className={styles.addButton}>
              Crear Proyecto
            </button>
          )}
        </div>
        <ul className={styles.projectList}>
          {projects.map((project) => (
            <li key={project.id} className={styles.projectItem}>
              {editingProject?.id === project.id ? (
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className={styles.inputField}
                />
              ) : (
                <span>{project.name}</span>
              )}
              <p>Hora de Inicio: {formatTime(project.startDate)}</p>
              <ul>
                {project.users.map((user) => (
                  <li key={user.id}>{user.username}</li>
                ))}
              </ul>
              {editingProject?.id === project.id ? (
                <button onClick={handleSaveEdit} className={styles.saveButton}>
                  Guardar
                </button>
              ) : (
                <button
                  onClick={() => handleEditProject(project.id)}
                  className={styles.editButton}
                >
                  Editar
                </button>
              )}
              <button
                onClick={() => handleDeleteProject(project.id)}
                className={styles.deleteButton}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}