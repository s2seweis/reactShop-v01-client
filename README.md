# React Shop with Firebase, Redux, and Redux Saga

This project is a simple e-commerce web application built with React, Firebase, Redux, and Redux Saga. It serves as a foundation for creating an online store with user authentication, product management, and state management using Redux and Redux Saga.

## Features

- **User Authentication**: Utilizes Firebase Authentication for secure user sign-up and login.

- **Product Management**: Easily manage and display products with Firebase Realtime Database or Firestore.

- **Shopping Cart**: Implements a shopping cart system using Redux for state management.

- **Async Operations**: Utilizes Redux Saga for handling asynchronous operations such as fetching data from Firebase.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)

## Getting Started

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Firebase Configuration:**

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase configuration (API Key, Auth Domain, Database URL) and replace the placeholder values in `src/firebaseConfig.js` with your actual Firebase configuration.
   - create config.js file inside of client/src/services and add youre firebase credentials

4. **Run the Application:**

   ```bash
   npm run client
   ```

   The application will be available at `http://localhost:8080`.

## Available Scripts

In the project directory, for seeing the scripts, just run:

```
npm run
```

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
```

Make sure to customize this README.md file according to your specific project details and structure. Include any additional information that might be relevant for users or contributors to understand and use your React shop project.