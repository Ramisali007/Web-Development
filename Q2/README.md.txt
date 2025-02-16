Interactive To-Do List with Priority Management

Overview
I implemented this project to create an interactive to-do list where users can add, delete, and prioritize tasks dynamically. The tasks are categorized by priority levels (High, Medium, Low), and users can mark tasks as completed, moving them to a separate section. The app uses vanilla JavaScript, HTML, and CSS, with no external libraries or frameworks.

Features
Add Tasks: Users can add tasks with a name and priority level.
Priority Groups: Tasks are dynamically grouped by priority (High, Medium, Low).
Complete/Delete: Tasks can be marked as completed or deleted.
Search & Filter: Users can search tasks by name and filter by priority.
Dark Mode: A toggle button allows switching between light and dark themes.
Dynamic Updates: The UI updates instantly without requiring a page refresh.

Implementation Details
HTML
I structured the HTML to include:
An input field for adding tasks.
A dropdown to select task priority.
Buttons for adding tasks and toggling dark mode.
Sections for displaying incomplete and completed tasks, grouped by priority.

CSS
I used CSS variables for consistent theming and modern design:
A professional color scheme with gradients and shadows.
Responsive layout using Flexbox.
Smooth transitions for dark mode and interactive elements.

JavaScript
I implemented the core functionality using vanilla JavaScript:
Arrays: Tasks are stored in an array and dynamically rendered using map().
Event Delegation: A single event listener handles all button clicks.
Dynamic Updates: The UI updates instantly when tasks are added, completed, or deleted.
Search & Filter: Tasks are filtered based on user input and selected priority.
Dark Mode: A toggle button switches between light and dark themes.

How to Use

Add a Task:
Enter a task name in the input field.
Select a priority level (High, Medium, Low).
Click "Add Task" or press Enter.

Complete a Task:
Click the "Complete" button next to a task to move it to the completed list.

Delete a Task:
Click the "Delete" button next to a task to remove it.

Search & Filter:
Use the search bar to find tasks by name.
Use the priority filter to show tasks of a specific priority.

Toggle Dark Mode:
Click the 🌓 button to switch between light and dark themes.

Code Structure
HTML: index.html
CSS: styles.css
JavaScript: scripts.js

Constraints
No external libraries or frameworks were used.
The app is fully responsive and works on all modern browsers.

Bonus Features
Search & Filter: Users can search tasks by name and filter by priority.
Dark Mode: A toggle button allows switching between light and dark themes.

Future Improvements
Add local storage to persist tasks between sessions.
Implement drag-and-drop functionality for reordering tasks.
Add due dates and reminders for tasks.