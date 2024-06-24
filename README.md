<<<<<<< HEAD
## Project Name DEVLOCK

## Description

This is a secure and user-friendly fullstack authentication application built with Next.js. It provides features for user registration, login, email verification, password reset, and a responsive user interface using Tailwind CSS. The application utilizes a MongoDB database to store user data.

## Features

User Registration: Users can create accounts with email and password.
Email Verification: Upon registration, a verification email is sent to confirm the user's email address. Accounts remain inactive until verified.
Login: Users can log in with their registered email and password.
Forgot Password: Users can request a password reset link to be sent to their email.
Secure Email: Mailtrap is used for sending emails through Nodemailer, ensuring a reliable and secure email communication channel.
Responsive Design: Tailwind CSS is utilized to create a mobile-friendly user interface that adapts to different screen sizes.
MongoDB Database: User data is securely stored in a MongoDB database.

## Technologies

Frontend: Next.js
Backend: Node.js (with Express.js if applicable)
Email: Mailtrap (for development) / SMTP service (for production)
Email Sending: Nodemailer
Styling: Tailwind CSS
Database: MongoDB

## Installation

Clone this repository: git clone https://github.com/your-username/your-repo-name.git
Navigate to the project directory: cd your-repo-name
Install dependencies: npm install (or yarn install)

## Configuration

Environment Variables: Create a .env.local file (not version controlled) in the project root directory and set the following environment variables:

NEXTAUTH_URL: The base URL of your application (e.g., http://localhost:3000)
EMAIL_HOST: Mailtrap hostname (or your SMTP server hostname)
EMAIL_PORT: Mailtrap port (or your SMTP server port)
EMAIL_USER: Mailtrap username (or your SMTP server username)
EMAIL_PASSWORD: Mailtrap password (or your SMTP server password)
MONGODB_URI: Your MongoDB connection URI (or connection string for your chosen database)
JWT_SECRET: A strong secret key for signing JSON Web Tokens
EMAIL_VERIFICATION_URL: The URL to redirect users to after successful email verification (e.g., http://localhost:3000/verified)
Mailtrap: Sign up for a free Mailtrap account (https://mailtrap.io/) to test email functionality during development. Replace the environment variables with your Mailtrap credentials. If deploying to production, use a reliable SMTP service and configure the appropriate credentials.

## Usage

Start the development server: npm run dev (or yarn dev)
Access the application in your browser: http://localhost:3000 (or your configured URL)
Register a new account using the signup form.
Check your email for the verification link and click it to activate your account.
Login using your registered email and password.
(Optional) Test the forgot password functionality by requesting a password reset link and following the instructions in the email.

## Deployment

Deploy your Next.js application to a production server following the official Next.js deployment guide (https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy).
Configure your database connection and email service using appropriate environment variables on your production server.

## License

(Specify the license you want to use for your project - e.g., MIT, Apache License)

## Contributing

Feel free to contribute to this project by creating pull requests. Please ensure your code adheres to the project's style guide and best practices.
=======
# next-fullstack-auth
>>>>>>> 2b80aa2431c32e2efc977d05c600ab3002ba1739
