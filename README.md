# Todo List Application

A simple Todo List application that allows users to add, edit, delete, and manage tasks. The application stores data locally using `localStorage` to persist the todo items even after refreshing the page.

## Features

- Add new tasks with a timestamp.
- Edit existing tasks.
- Mark tasks as completed (with strikethrough effect).
- Automatically delete completed tasks after a short delay.
- Delete individual tasks.
- Delete all tasks at once.
- Data persistence using `localStorage` (tasks remain even after the browser is refreshed).

## Built With

- **HTML**: Structure and layout of the application.
- **CSS**: Basic styling to make the application visually appealing.
- **JavaScript**: Handles all the application logic including task management and `localStorage` integration.

## How to Use

1. **Add a Todo**:
   - Enter a task in the input field and click the "Add" button.
   - The task will appear in the list with a timestamp and action buttons.

2. **Mark as Completed**:
   - Click on the task name, and it will be marked as completed with a strikethrough.
   - Completed tasks will automatically be deleted after 2 seconds.

3. **Edit a Todo**:
   - Click the "Edit" button (pencil icon) next to a task to edit its text.
   - After editing, click the save icon to update the task.

4. **Delete a Todo**:
   - Click the "Delete" button (trash icon) next to a task to remove it from the list.

5. **Delete All Todos**:
   - If there are tasks in the list, the "Delete All" button will be visible.
   - Clicking it will remove all tasks from the list and clear the `localStorage`.

## Local Storage

This application uses the browser's `localStorage` to store tasks, which means that the tasks will persist across browser sessions (e.g., if you close and reopen the browser, your tasks will still be there).

- Tasks are saved as an array of objects in `localStorage` under the key `"todos"`.
- Each task contains:
  - `id`: The timestamp when the task was created (in HH:MM format).
  - `text`: The task description.
  - `completed`: Boolean value indicating whether the task is completed.
