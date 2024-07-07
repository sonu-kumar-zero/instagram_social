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

#### Nodemon Setup:

1. **Install nodemon global**
    ```bash
    npm install -g nodemon

### Start the Instagram Application:

1. **In Root Directory**
    ```bash
    npm run dev
