export const ROLES = {
    ADMIN: 'Administrador',
    MANAGER: 'Gerente',
    USER: 'Usuario',
  };
  
  export const PERMISSIONS = {
    MANAGE_USERS: 'Gestionar usuarios',
    CONFIGURE_ROLES: 'Configurar roles',
    SUPERVISE_ACTIVITY: 'Supervisar actividad',
    SYSTEM_MAINTENANCE: 'Mantenimiento del sistema',
  };
  
  export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: [
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.CONFIGURE_ROLES,
      PERMISSIONS.SUPERVISE_ACTIVITY,
      PERMISSIONS.SYSTEM_MAINTENANCE,
    ],
    [ROLES.USER]: [],
  };