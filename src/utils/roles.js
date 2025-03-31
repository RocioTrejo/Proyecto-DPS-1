// roles.js - Definición de roles y permisos en la aplicación

// Roles disponibles en el sistema
export const ROLES = {
  ADMIN: 'Administrador',
  MANAGER: 'Gerente',
  USER: 'Usuario',
};

// Permisos del sistema
export const PERMISSIONS = {
  MANAGE_USERS: 'Gestionar usuarios',
  CONFIGURE_ROLES: 'Configurar roles',
  SUPERVISE_ACTIVITY: 'Supervisar actividad',
  SYSTEM_MAINTENANCE: 'Mantenimiento del sistema',
  VIEW_PROJECTS: 'Ver proyectos',
  EDIT_PROJECTS: 'Editar proyectos',
};

// Asignación de permisos por rol
export const ROLE_PERMISSIONS = {
  // El Administrador tiene acceso total
  [ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.CONFIGURE_ROLES,
    PERMISSIONS.SUPERVISE_ACTIVITY,
    PERMISSIONS.SYSTEM_MAINTENANCE,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.EDIT_PROJECTS,
  ],

  // El Gerente puede ver y editar proyectos, y supervisar actividad
  [ROLES.MANAGER]: [
    PERMISSIONS.SUPERVISE_ACTIVITY,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.EDIT_PROJECTS,
  ],

  // El Usuario solo puede ver proyectos y supervisar actividad
  [ROLES.USER]: [
    PERMISSIONS.SUPERVISE_ACTIVITY,
    PERMISSIONS.VIEW_PROJECTS,
  ],
};