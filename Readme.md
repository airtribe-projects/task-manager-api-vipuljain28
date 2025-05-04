# Task Manager API

## Overview
The Task Manager API is a RESTful API built with Node.js and Express.js for managing tasks. It supports CRUD operations, filtering, sorting, and priority-based task management. The API uses in-memory data storage for simplicity and is designed to demonstrate key concepts of building APIs, including error handling and input validation.

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd task-manager-api-vipuljain28
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Server**:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000` by default.

4. **Run Tests**:
   ```bash
   npm test
   ```

---

## API Endpoints

### 1. **Create a Task**
   - **Endpoint**: `POST /api/tasks`
   - **Description**: Creates a new task.
   - **Request Body**:
     ```json
     {
       "title": "Task Title",
       "completed": false,
       "priority": "high"
     }
     ```
   - **Response**:
     ```json
     {
       "id": 1,
       "title": "Task Title",
       "completed": false,
       "priority": "high"
     }
     ```

### 2. **Get All Tasks**
   - **Endpoint**: `GET /api/tasks`
   - **Description**: Retrieves all tasks with optional filtering and sorting.
   - **Query Parameters**:
     - `completed` (optional): Filter by completion status (`true` or `false`).
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "title": "Task Title",
         "completed": false,
         "priority": "high"
       }
     ]
     ```

### 3. **Get a Task by ID**
   - **Endpoint**: `GET /api/tasks/:id`
   - **Description**: Retrieves a task by its ID.
   - **Response**:
     ```json
     {
       "id": 1,
       "title": "Task Title",
       "completed": false,
       "priority": "high"
     }
     ```

### 4. **Update a Task**
   - **Endpoint**: `PUT /api/tasks/:id`
   - **Description**: Updates a task by its ID.
   - **Request Body**:
     ```json
     {
       "title": "Updated Task Title",
       "completed": true,
       "priority": "medium"
     }
     ```
   - **Response**:
     ```json
     {
       "id": 1,
       "title": "Updated Task Title",
       "completed": true,
       "priority": "medium"
     }
     ```

### 5. **Delete a Task**
   - **Endpoint**: `DELETE /api/tasks/:id`
   - **Description**: Deletes a task by its ID.
   - **Response**: Status `204 No Content`.

### 6. **Get Tasks by Priority**
   - **Endpoint**: `GET /api/tasks/priority/:level`
   - **Description**: Retrieves tasks by priority level (`low`, `medium`, `high`).
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "title": "Task Title",
         "completed": false,
         "priority": "high"
       }
     ]
     ```

---

## Testing the API
You can test the API using tools like [Postman](https://www.postman.com/) or `curl`.

### Example `curl` Commands:
1. **Create a Task**:
   ```bash
   curl -X POST http://localhost:3000/api/tasks \
   -H "Content-Type: application/json" \
   -d '{"title": "Learn Node.js", "completed": false, "priority": "high"}'
   ```

2. **Get All Tasks**:
   ```bash
   curl http://localhost:3000/api/tasks
   ```

3. **Get Tasks by Priority**:
   ```bash
   curl http://localhost:3000/api/tasks/priority/high
   ```

4. **Update a Task**:
   ```bash
   curl -X PUT http://localhost:3000/api/tasks/1 \
   -H "Content-Type: application/json" \
   -d '{"completed": true, "priority": "medium"}'
   ```

5. **Delete a Task**:
   ```bash
   curl -X DELETE http://localhost:3000/api/tasks/1
   ```

---

## Notes
- The API uses in-memory storage, so data will be lost when the server restarts.
- You can extend the project by integrating a database like MongoDB or PostgreSQL for persistent storage.