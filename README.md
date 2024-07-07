# Instagram Social

![Instagram Social](https://img.shields.io/badge/Instagram-Social-blue)

## Introduction

Welcome to **Instagram Social**, a feature-rich social media application inspired by Instagram. This project provides a comprehensive social networking experience, including features like user authentication, photo sharing, comments, likes, and much more.

## Demo

Check out the live demo of the application:
[Instagram Social Demo](https://your-live-demo-link.com)

## Features

- **User Authentication:** Sign up, log in, and manage your profile.
- **Photo Upload:** Share your favorite moments by uploading photos.
- **Interactive Feed:** Scroll through a dynamic feed with photos from other users.
- **Likes and Comments:** Engage with posts through likes and comments.
- **Search Functionality:** Find users and posts easily.
- **Real-time Notifications:** Stay updated with instant notifications.
- **Secure and Scalable Backend:** Built with Node.js and PostgreSQL.

## Technologies Used

- **Frontend:** React, Redux, TailwindCSS, shadCN
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Real-time Updates:** WebSockets
- **Deployment:** Vercel (Frontend), Heroku (Backend)
- **CDN:** Custom CDN with HLS for media streaming

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v13 or later)
- Git

### Installation

#### Nodemon Setup:

1. **Install nodemon global**
    ```bash
    npm install -g nodemon

#### Backend Setup:

1. **Navigate to the backend directory:**

   ```bash
   cd user_backend

2. **Install dependencies:**
    ```bash
    npm install

3. **Add .ENV File**
    ```bash
    same as .env.sample and add neccessary links

4. **Set up the PostgreSQL database:**
    Create a new database and update the DATABASE_URL in the .env file with your database credentials.

5. **Run migrations to set up the database schema:**
    ```bash
    npx sequelize-cli db:migrate

6. **Start the backend server:**
    ```bash
    npm run dev

#### CDN Setup:

1. **Navigate to the cdn directory:**
   ```bash
   cd instagram_cdn

2. **Install dependencies:**
    ```bash
    npm install

3. **Add .ENV File**
    ```bash
    same as .env.sample and add neccessary links

4. **Start the CDN server:**
    ```bash
    npm run dev

#### Frontend Setup:

1. **Navigate to the frontend directory:**
   ```bash
   cd instagram_frontend

2. **Install dependencies:**
    ```bash
    npm install

3. **Add .ENV File**
    ```bash
    same as .env.sample and add neccessary links

4. **Start the Frontend:**
    ```bash
    npm run dev

## Usage

### Sign Up and Log In
- **Create a New Account:** Register with your email and a password to create a new account.
- **Log In:** Use your credentials to access your account.

### Profile Management
- **Update Profile:** Modify your profile details, such as your username, bio, and other personal information.
- **Upload Profile Picture:** Personalize your account by uploading a profile picture.

### Post Photos
- **Share Photos:** Upload and share your favorite photos with captions to your profile.

### Interact with Posts
- **Like Posts:** Express your appreciation for posts by liking them.
- **Comment on Posts:** Engage with the community by commenting on posts.
- **View Feed:** Browse through posts from users you follow in your feed.

### Search
- **Find Users and Posts:** Utilize the search bar to discover other users and explore posts.

### Notifications
- **Real-time Alerts:** Stay updated with instant notifications for likes and comments on your posts.


## Contributing

We welcome contributions from the community! To get started, follow these steps:

1. **Fork the Repository**: 
   - Click the "Fork" button on the upper right corner of the repository page to create a copy of the repository in your GitHub account.

2. **Clone Your Fork**:
   - Clone the forked repository to your local machine using:
     ```bash
     git clone https://github.com/your-username/repository-name.git
     ```
   - Replace `your-username` with your GitHub username and `repository-name` with the name of the repository.

3. **Create a New Branch**:
   - Navigate to the project directory and create a new branch for your feature or bug fix:
     ```bash
     git checkout -b feature/your-feature-name
     ```
   - Replace `your-feature-name` with a descriptive name for your feature or fix.

4. **Make Your Changes**:
   - Implement your changes or new feature on your branch.

5. **Commit Your Changes**:
   - Add the changes to the staging area and commit them with a meaningful message:
     ```bash
     git add .
     git commit -m 'Add some feature'
     ```
   - Replace `'Add some feature'` with a relevant commit message that describes your changes.

6. **Push to the Branch**:
   - Push your changes to your forked repository on GitHub:
     ```bash
     git push origin feature/your-feature-name
     ```

7. **Create a Pull Request**:
   - Go to the original repository on GitHub and click the "Pull Request" button.
   - Select your branch and provide a clear description of your changes.
   - Submit the pull request for review.

Once you've submitted your pull request, we'll review your changes and provide feedback or merge them into the main project. Thank you for your contributions!

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to reach out:

- **Sonu Kumar**
  - [GitHub](https://github.com/sonu-kumar-zero)
  - [Portfolio](https://portfolio-neon-psi-71.vercel.app/)
  - Email: sonukumarzeroone@gmail.com 


