import ProtectedRoute from '@components/Auth/Shared/ProtectedRoute';
import { ROLES } from 'src/utils/roles';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@styles/usuarios.module.css';

export default function UsuariosPage() {
  const router = useRouter();
  const [proyectos, setProyectos] = useState([
    {
      id: 1,
      nombre: 'Proyecto A',
      tareas: [
        { id: 1, nombre: 'Tarea 1', estado: 'Pendiente', comentarios: [] },
        { id: 2, nombre: 'Tarea 2', estado: 'En Progreso', comentarios: [] },
      ],
    },
    {
      id: 2,
      nombre: 'Proyecto B',
      tareas: [
        { id: 3, nombre: 'Tarea 3', estado: 'Completada', comentarios: [] },
      ],
    },
  ]);

  const actualizarEstadoTarea = (proyectoId, tareaId, nuevoEstado) => {
    setProyectos((prevProyectos) =>
      prevProyectos.map((proyecto) =>
        proyecto.id === proyectoId
          ? {
              ...proyecto,
              tareas: proyecto.tareas.map((tarea) =>
                tarea.id === tareaId ? { ...tarea, estado: nuevoEstado } : tarea
              ),
            }
          : proyecto
      )
    );
  };

  const agregarComentario = (proyectoId, tareaId, comentario) => {
    setProyectos((prevProyectos) =>
      prevProyectos.map((proyecto) =>
        proyecto.id === proyectoId
          ? {
              ...proyecto,
              tareas: proyecto.tareas.map((tarea) =>
                tarea.id === tareaId
                  ? {
                      ...tarea,
                      comentarios: [...tarea.comentarios, comentario],
                    }
                  : tarea
              ),
            }
          : proyecto
      )
    );
  };

  const handleGuardarCambios = (proyectoId) => {
    const proyecto = proyectos.find((p) => p.id === proyectoId);
    console.log('Guardando cambios para el proyecto:', proyecto);
    // Aquí puedes agregar la lógica para guardar los cambios en el servidor o en el almacenamiento local
    alert(`Cambios guardados para el proyecto: ${proyecto.nombre}`);
  };

  const handleLogout = () => {
    router.push('/auth/login'); // Redirige al login
  };

  return (
    <ProtectedRoute requiredRole={ROLES.USER}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>Miembros del Equipo</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </header>
        <div className={styles.projectsContainer}>
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className={styles.projectCard}>
              <h2 className={styles.projectTitle}>{proyecto.nombre}</h2>
              <ul className={styles.taskList}>
                {proyecto.tareas.map((tarea) => (
                  <li key={tarea.id} className={styles.taskItem}>
                    <div className={styles.taskHeader}>
                      <span>{tarea.nombre}</span>
                      <select
                        value={tarea.estado}
                        onChange={(e) =>
                          actualizarEstadoTarea(proyecto.id, tarea.id, e.target.value)
                        }
                        className={styles.taskSelect}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Completada">Completada</option>
                      </select>
                    </div>
                    <div className={styles.commentsSection}>
                      <h4>Comentarios:</h4>
                      <ul>
                        {tarea.comentarios.map((comentario, index) => (
                          <li key={index}>{comentario}</li>
                        ))}
                      </ul>
                      <input
                        type="text"
                        placeholder="Agregar comentario"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim() !== '') {
                            agregarComentario(proyecto.id, tarea.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className={styles.commentInput}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGuardarCambios(proyecto.id)}
                className={styles.saveButton}
              >
                Guardar Cambios
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}