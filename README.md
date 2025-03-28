
# Task Service

Este microservicio gestiona las tareas de los usuarios, permitiendo crear, obtener, actualizar y eliminar tareas.

## Instalación

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu-repo/task-service.git
   ```
2. Instalar las dependencias:
   ```sh
   cd task-service
   npm install
   ```
3. Configurar las variables de entorno en un archivo `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskdb
   JWT_SECRET=tu_clave_secreta
   ```

## Ejecución

Para iniciar el servidor:
```sh
npm start
```

## Endpoints

### 1. Crear una tarea (protegido)
**POST** `/api/tasks`

- **Descripción**: Crea una nueva tarea.
- **Autenticación**: Se requiere token JWT.
- **Body (JSON):**
  ```json
  {
    "title": "Nombre de la tarea",
    "description": "Descripción de la tarea"
  }
  ```
- **Respuesta:**
  ```json
  {
    "_id": "id_generado",
    "title": "Nombre de la tarea",
    "description": "Descripción de la tarea",
    "user": "id_del_usuario",
    "createdAt": "fecha"
  }
  ```

### 2. Obtener todas las tareas del usuario (protegido)
**GET** `/api/tasks`

- **Descripción**: Obtiene todas las tareas creadas por el usuario autenticado.
- **Autenticación**: Se requiere token JWT.
- **Respuesta:**
  ```json
  [
    {
      "_id": "id_generado",
      "title": "Nombre de la tarea",
      "description": "Descripción de la tarea",
      "user": "id_del_usuario",
      "createdAt": "fecha"
    }
  ]
  ```

### 3. Actualizar una tarea (protegido)
**PUT** `/api/tasks/:id`

- **Descripción**: Actualiza una tarea específica del usuario autenticado.
- **Autenticación**: Se requiere token JWT.
- **Parámetros:**
  - `id`: ID de la tarea a actualizar.
- **Body (JSON):**
  ```json
  {
    "title": "Nuevo nombre de la tarea",
    "description": "Nueva descripción"
  }
  ```
- **Respuesta:**
  ```json
  {
    "_id": "id_generado",
    "title": "Nuevo nombre de la tarea",
    "description": "Nueva descripción",
    "user": "id_del_usuario",
    "createdAt": "fecha_actualizada"
  }
  ```

### 4. Eliminar una tarea (protegido)
**DELETE** `/api/tasks/:id`

- **Descripción**: Elimina una tarea específica del usuario autenticado.
- **Autenticación**: Se requiere token JWT.
- **Parámetros:**
  - `id`: ID de la tarea a eliminar.
- **Respuesta:**
  ```json
  {
    "msg": "Tarea eliminada correctamente"
  }
  ```

## Notas
- El servicio usa `MongoDB` como base de datos.
- Se implementa autenticación con `JWT`.
- Se requiere un usuario autenticado para interactuar con los endpoints.

