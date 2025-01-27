# 🍽️ Restaurant App

A modern, responsive restaurant application built with React, TypeScript, and Redux Toolkit. This application provides a seamless experience for customers to browse menus, customize orders, and manage their shopping cart.

## ✨ Features

- 📱 **Interactive Menu**: Browse through restaurant items with detailed descriptions
- 🛒 **Shopping Cart**: Real-time cart management with Redux
- 📱 **Responsive Design**: Built with Tailwind CSS for a mobile-first approach
- 🌍 **Internationalization**: Multi-language support using i18next
- 🛡️ **Type Safety**: Built with TypeScript for better development experience
- 📦 **State Management**: Centralized state management with Redux Toolkit
- 🧩 **Component Architecture**: Modular and reusable components
- 🔄 **Routing**: Client-side routing with React Router

## 🌎 Internationalization

This project supports multiple languages 🇺🇸 🇧🇷

By default, the application will detect and use your browser's language setting. However, you can manually switch languages by accessing:

- `/en` - English
- `/pt` - Portuguese

## 🛠️ Technology Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- i18next
- Jest & React Testing Library

## 🚀 Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd restaurant-app
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/          # Application core setup
├── assets/       # Static assets
├── components/   # Reusable UI components
├── contexts/     # React contexts
├── features/     # Redux slices and features
├── hooks/        # Custom React hooks
├── i18n/         # Internationalization setup
├── pages/        # Page components
├── routes/       # Routing configuration
├── styles/       # Global styles
└── types/        # TypeScript type definitions
```

## 🧪 Testing

Run the test suite:

```bash
yarn test
```

## 🏗️ Building for Production

Create a production build:

```bash
yarn build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🤔 Technical Decisions

- 🛡️ **TypeScript**: Chosen for type safety and better developer experience
- 📦 **Redux Toolkit**: Used for predictable state management and built-in dev tools
- 🎨 **Tailwind CSS**: Provides utility-first CSS framework for rapid UI development
- 🧩 **Component Structure**: Organized by feature and functionality for better maintainability
- 🌍 **i18next**: Implements internationalization for global accessibility
- 🧪 **Testing Library**: Focuses on testing user interactions rather than implementation details

## 👨‍💻

- I'm using proxy to avoid the API CORS issue.
- If the request not work, please refresh the page.
