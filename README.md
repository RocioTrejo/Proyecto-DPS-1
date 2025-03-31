integrantes:

Steffany Rocio Leonor Trejo      LT172547
Deysi Guadalupe Sosa De Paz Sosa  DS170922

# Dashboard Multi-Rol con Firebase

Este proyecto es un panel de administración que permite gestionar usuarios y proyectos, con control de acceso basado en roles. Está desarrollado en React (Next.js), usando Firebase como backend para autenticación y base de datos.

# Enlace de la base
https://console.firebase.google.com/u/0/project/proyecto-avance-dps-1-81c85/firestore/databases/-default-/data/~2Fprojects~2F7OJ7fKS7IWHmyD9D5h7M

# Clonar el repositorio
git clone https://github.com/usuario/nombre-del-proyecto.git

# Entrar a la carpeta del proyecto
cd nombre-del-proyecto

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

## Tecnologías Utilizadas

- React / Next.js
- Firebase (Firestore y Authentication)
- CSS Modules
- Visual Studio Code

## Roles y Accesos

### Administrador
- Crear, editar y eliminar usuarios
- Asignar roles
- Crear, editar y eliminar proyectos
- Ver y gestionar todos los datos

### Gerente
- Crear y editar proyectos
- Asignar usuarios a proyectos
- Visualizar proyectos propios y asignados

### Usuario
- Ver proyectos asignados
- Agregar comentarios
- Cambiar estado del proyecto si está habilitado

## Estructura del Proyecto
/src
  /components
  /context
  /pages
  /services
  /styles


## Instalación

1. se descargo la carpeta y se trabajo de forma local luego se subio el documento y actualizo

## Funcionalidades Principales

- Autenticación basada en Firestore
- Control de acceso por roles
- Gestión de usuarios y proyectos
- Cambio de estado del proyecto (nuevo, en proceso, finalizado)
- Sistema de comentarios por proyecto



## Conexion de la base de datos
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



## Funciones clave del proyecto

| Función / Constante        | Descripción                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `useAuth`                  | Hook para acceder al contexto de autenticación en toda la app.              |
| `login(username, role)`    | Inicia sesión y guarda el usuario en `localStorage`.                       |
| `logout()`                 | Cierra sesión y elimina el usuario autenticado.                             |
| `hasPermission(permission)`| Verifica si el usuario tiene permiso según su rol.                         |
| `getUsers()`               | Obtiene todos los usuarios desde Firebase.                                  |
| `addUser(user)`            | Agrega un nuevo usuario a Firebase.                                         |
| `updateUser(id, data)`     | Actualiza la información de un usuario en Firebase.                         |
| `deleteUser(id)`           | Elimina un usuario de la base de datos.                                     |
| `getProjects()`            | Obtiene todos los proyectos desde Firebase.                                 |
| `addProject(project)`      | Agrega un nuevo proyecto a la base de datos.                                |
| `updateProject(id, data)`  | Modifica nombre, usuarios o estado de un proyecto existente.                |
| `deleteProject(id)`        | Elimina un proyecto de la base de datos.                                    |
| `ProtectedRoute`           | Componente que restringe rutas según el rol del usuario (Admin, Gerente, Usuario)



## Autores

Rocio Trejo  
GitHub: https://RocioTrejo github.com

Deysi Sosa
GitHub: https://deysisosa github.com

Enlace del drive con el video: https://drive.google.com/drive/folders/1hGFYhzicokvQMFGZ_5_NQfJG0PhheNVP?usp=sharing
