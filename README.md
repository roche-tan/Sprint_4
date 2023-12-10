# API to-do list

---

### Description

In this project I created a To-do list API with Postman testing.

- Typescript
- Nodejs
- test-jest
- Hexagonal
- Postman

1. Authentification will be needed while testing in Postman.
   User: admin
   Password: admin

2. HTTP Methods: GET, POST, PUT and DELETE
#### Get All Tasks
  ```Method: GET
  Endpoint: /tasks
  Description: Retrieves a list of all tasks.
  Parameters: None
  Success (200): Returns an array of tasks.
  Error (500): Returns an error message if an unexpected error occurs.```

#### Add Task
   ```Method: POST
  Endpoint: /tasks
  Description: Adds a new task to the list.
  Request Body:
    taskName: String (required)
    isCompleted: Boolean (required)
  Success (201): Returns the created task.
  Error (400): Returns an error message for invalid input or unexpected errors. ```

#### Update Task
   ```Method: PUT
  Endpoint: /tasks/:id
  Description: Updates an existing task.
  Parameters:
    id: String (required, path parameter)
    Request Body: Task object with updated fields.
  Success (200): Returns the updated task.
  Error (500): Returns an error message if an unexpected error occurs. ```

#### Delete Task
   ```Method: DELETE
  Endpoint: /tasks/:id
  Description: Deletes a task based on its ID.
  id: String (required, path parameter)
  Success (200): Message confirming deletion.
  Error (500): Returns an error message if an unexpected error occurs. ```

#### Error Handling
   ```Task Not Found: Returned when a task with the specified ID does not exist.
  Empty Task Error: Returned when an attempt is made to add an empty task.
  Task Already Exists: Returned when an attempt is made to add a task that already exists.
  Task Not Completed: Returned when an attempt is made to delete a task that is not marked as completed. ```

### Installation

1. Clone this repository to your local machine:

   `git clone https://github.com/roche-tan/Sprint_4.git `

2. Move to folder

3. Install all project dependencies in each folder:

   `npm install`

### Usage

- To manually transpile from Typescript to Javascript:

  `npx tsc`

- To run Jest tests:

  `npm test`

- To run API:
  
  `npm start`

Test done in Postman are in json format in this repository
