# Node.js Express Application

This project is a server application built with Node.js and Express. It includes the following features:

- A RESTful API for managing users, posts, and comments.
- Custom email middleware.
- Use of EJS as a template engine for rendering views.
- Interaction with a self-made API through HTML forms.
- Data stored in local files (`users.js`, `posts.js`, `comments.js`) instead of an external database.

The application will be running on `http://localhost:3000`.

### Usage

#### API Endpoints

- **Users:**

  - `GET /users`: Retrieve all users.
  - `GET /users/:id`: Retrieve a specific user by ID.
  - `POST /users`: Create a new user.
  - `PUT /users/:id`: Update a user by ID.
  - `DELETE /users/:id`: Delete a user by ID.
  - `GET /users/:id/posts`: Retrieve all posts for a specific user.
  - `GET /users/:id/comments`: Retrieve all comments for a specific user.
  - `GET /users/:id/activity`: Retrieve a specific user with their posts and comments.

- **Posts:**

  - `GET /posts`: Retrieve all posts.
  - `GET /posts/:id`: Retrieve a specific post by ID.
  - `GET /posts/user/:userId`: Retrieve all posts for specific user.
  - `POST /posts`: Create a new post.
  - `PUT /posts/:id`: Update a post by ID.
  - `DELETE /posts/:id`: Delete a post by ID.

- **Comments:**
  - `GET /comments`: Retrieve all comments.
  - `GET /comments/user/:userId`: Retrieve all comments for specific user.
  - `GET /comments/post/:postId`: Retrieve all comments for specific post.
  - `GET /comments/:id`: Retrieve a specific comment by ID.
  - `POST /comments`: Create a new comment.
  - `PUT /comments/:id`: Update a comment by ID.
  - `DELETE /comments/:id`: Delete a comment by ID.

### Middleware

The application includes custom middleware for:

- Checking for existing emails (`checkIfEmailExists.js`).

### Views

The application uses EJS as a template engine to render views. The main view is:

- `userDetails.ejs`: Displays user information, including posts and comments.

### Project Structure

```plaintext
express-app/
├── data/
│   ├── users.js
│   ├── posts.js
│   └── comments.js
├── routes/
│   ├── userRoutes.js
│   ├── postRoutes.js
│   └── commentRoutes.js
├── middleware/
│   └── checkIfEmailExists.js
├── public/
│   └── styles.css
│       └── activity-css/
│           └── styles.css
├── views/
│   ├── userDetails.ejs
│   └── index.ejs
├── server.js
└── README.md
```
