# Task Management Application

This is a Task Management Application developed as part of the technical screening assignment.
The application allows users to create, view, update, delete, and search tasks using a web-based interface.

The backend is built using ASP.NET Core Web API and MySQL, while the frontend is developed using Angular as a Single Page Application (SPA).

---

## 🧩 Features

- Create new tasks
- View all tasks
- View task details by ID
- Update existing tasks
- Soft delete tasks
- Search tasks by Title and Status
- Status management using master table
- Swagger API documentation

---

## Technologies Used

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- MySQL
- Swagger (OpenAPI)

### Frontend
- Angular (SPA)
- TypeScript
- Bootstrap
- Angular HTTP Client

### Tools
- Visual Studio
- Visual Studio Code
- MySQL Workbench
- GitHub

---

## 🗄 Database Design

### Tables Used

#### 1. users
- user_id (Primary Key)
- user_name
- email
- created_on

#### 2. tasks
- task_id (Primary Key)
- task_title
- task_description
- task_due_date
- task_status
- task_remarks
- created_on
- last_updated_on
- created_by_user_id
- last_updated_by_user_id
- is_deleted (Soft delete flag)

#### 3. task_status_master
- status_id
- status_name

---

### ER Diagram
The database follows a relational structure where users create and update tasks.
(ER diagram image can be added here if required)

---

### Data Dictionary
Each column is designed to store specific task-related information such as title, description, status, timestamps, and user references.

---

### Indexes
- Primary index on `task_id`
- Index on `task_status` for faster search operations

---

### Database Approach
Code First approach is used to allow better maintainability and faster development.

---

## 🧱 Application Architecture

The backend follows a layered architecture:

- Controller Layer – Handles HTTP requests
- Service Layer – Business logic
- Repository Layer – Database operations
- Database Layer – MySQL

The frontend is a Single Page Application (SPA) built using Angular and communicates with the backend using RESTful APIs.

---

## 🔗 API Endpoints

### Task APIs
- GET `/api/Tasks/Get`
- GET `/api/Tasks/GetById/{id}`
- POST `/api/Tasks/Create`
- POST `/api/Tasks/Update`
- DELETE `/api/Tasks/Delete/{id}`
- GET `/api/Tasks/Search?title=&status=`

### Status APIs
- GET `/api/TaskStatus/GetAll`

Swagger UI is available for API testing and documentation.
![alt text](image.png)
---

## 🖥 Frontend Overview

The Angular frontend includes:
- Task creation form
- Task list view
- Search functionality
- Edit and delete actions

Angular services are used to communicate with backend APIs using HTTP Client.

---

## 🚀 How to Run the Project

### Backend Setup
1. Open the backend solution in Visual Studio
2. Update MySQL connection string in `appsettings.json`
3. Run the project
4. Swagger will be available at:

http://localhost:7000/swagger

---

### Frontend Setup

This project was generated using Angular CLI version 21.0.4.

#### Development Server
Run the following commands:

```bash
npm install
ng serve

#### Open browser and navigate to:
http://localhost:4200

## 📝 Notes

- Authentication and authorization are not implemented as they are outside the scope of this assignment.
- A static user ID is used for created and updated by fields for demonstration purposes.
- Soft delete is implemented to preserve historical task data.
- The application can be easily extended to support role-based access and authentication.

## 📌 Conclusion

This Task Management Application successfully demonstrates CRUD operations, REST API development, database design, and frontend integration using Angular. The project follows clean architecture principles and meets all objectives defined in the assignment.

