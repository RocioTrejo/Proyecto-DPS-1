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
  const [showUserList, setShowUserList] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState('');
  const [editedProjectStatus, setEditedProjectStatus] = useState('nuevo');
  const [editedComments, setEditedComments] = useState([]);
  const [newComment, setNewComment] = useState('');
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

  const handleUpdateProject = async (id) => {
    if (!editedProjectName.trim()) return;
    await updateProject(id, {
      name: editedProjectName,
      status: editedProjectStatus,
      comments: editedComments
    });
    const updatedProjects = await getProjects();
    setProjects(updatedProjects);
    setEditingProjectId(null);
    setEditedProjectName('');
    setEditedProjectStatus('nuevo');
    setEditedComments([]);
    setNewComment('');
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setEditedComments([...editedComments, newComment]);
      setNewComment('');
    }
  };

  return (
    <ProtectedRoute requiredRole={ROLES.USER}>
      <header className={styles.header}>
        <button onClick={logout} className={styles.logoutButton}>Cerrar Sesión</button>
      </header>

      <div className={styles.adminContainer}>
        <h1 className={styles.title}>Panel de Usuario</h1>

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
                    value={editedProjectStatus}
                    onChange={(e) => setEditedProjectStatus(e.target.value)}
                    className={styles.inputField}
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="en proceso">En Proceso</option>
                    <option value="finalizado">Finalizado</option>
                  </select>

                  <label>Agregar Comentario:</label>
                  <div className={styles.commentContainer}>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className={styles.inputField}
                      placeholder="Escribe un comentario"
                    />
                    <button type="button" onClick={handleAddComment} className={styles.addButton}>+</button>
                  </div>

                  <ul>
                    {editedComments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>

                  <button onClick={() => handleUpdateProject(project.id)} className={styles.saveButton}>Guardar Cambios</button>
                  <button onClick={() => setEditingProjectId(null)} className={styles.cancelButton}>Cancelar</button>
                </>
              ) : (
                <>
                  <h3>{project.name}</h3>
                  <p>Creado el {new Date(project.createdAt.seconds * 1000).toLocaleDateString()}</p>
                  <p><strong>Usuarios asignados:</strong> {project.users?.join(', ') || 'Ninguno'}</p>
                  <p><strong>Estado:</strong> {project.status || 'nuevo'}</p>
                  {project.comments?.length > 0 && (
                    <div>
                      <strong>Comentarios:</strong>
                      <ul>
                        {project.comments.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  )}
                  <button onClick={() => {
                    setEditingProjectId(project.id);
                    setEditedProjectName(project.name);
                    setEditedProjectStatus(project.status || 'nuevo');
                    setEditedComments(project.comments || []);
                  }} className={styles.editButton}>Editar</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}