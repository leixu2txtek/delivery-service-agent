# Delivery Service Agent Frontend

This is the frontend for the delivery service agent system, built with Vue 3, TypeScript, and Naive UI.

## Features

- Modern UI with Naive UI components
- Responsive design for mobile and desktop
- Authentication flow (login/logout)
- Chat interface with message history
- User profile management
- Dark/light theme support

## Tech Stack

- Vue 3 with Composition API
- TypeScript
- Naive UI - Rich component library with great animations
- Vue Router - Navigation
- Pinia - State management
- SCSS - Styling with BEM methodology
- Vite - Build tool

## Recommended UI Framework: Naive UI

For this project, we recommend **Naive UI** as the UI framework because:

1. **Excellent TypeScript Support**: Naive UI is developed with TypeScript from the ground up
2. **Beautiful Animations**: Smooth, well-designed animations throughout all components
3. **Modern Design**: Clean, contemporary interface with customizable themes
4. **Responsive Components**: All components work well on mobile and desktop
5. **Rich Component Library**: Covers all essential UI needs
6. **Active Development**: Regularly updated with new features

## Project Setup

```bash
# Install dependencies
pnpm install

# Compile and hot-reload for development
pnpm dev

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Naming Conventions

- Folder names: kebab-case (e.g., `components`, `views`, `mobile-layout`)
- CSS: SCSS with BEM methodology (e.g., `button__icon--large`)
- Components: PascalCase (e.g., `UserProfile.vue`)
- Variables: camelCase (e.g., `userName`)

## Directory Structure

```
src/
├── components/     # Reusable components
├── views/          # Page components
├── router/         # Vue Router configuration
├── stores/         # Pinia stores
├── styles/         # SCSS styles and variables
├── assets/         # Static assets
└── App.vue         # Root component
```