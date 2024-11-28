# Code Style Guide

> Based on [Alibaba Java Coding Guidelines](https://alibaba.github.io/Alibaba-Java-Coding-Guidelines/). This document provides the coding standards and best practices derived from Alibaba's official recommendations for Java projects, adjusted for front-end development in Vue.js and modern JavaScript frameworks.

------

## 1. **General Code Formatting**

- **Indentation**: Use 2 spaces for indentation. Avoid using tabs.
- **Line Length**: Limit all lines to a maximum of 120 characters.
- **Braces**: Always use braces `{}` for control structures, even for single-line statements.
- **Semicolons**: Always terminate statements with a semicolon.
- **Quotes**: Use single quotes `'` for strings, unless the string contains single quotes, in which case use double quotes `"`.

------

## 2. **Naming Conventions**

- **File Names**: File names should be lowercase, with words separated by hyphens (e.g., `user-profile.vue`).
- **Component Names**: Use `PascalCase` for component names (e.g., `UserProfile.vue`).
- **Method Names**: Use `camelCase` for method names, starting with a verb (e.g., `getUserData`).
- **Variables**: Use `camelCase` for variable names, and ensure they are descriptive (e.g., `userAge`, `deviceStatus`).
- **Constants**: Use `UPPER_CASE` for constants, with words separated by underscores (e.g., `MAX_TEMP`).
- **CSS Class Names**: Use the BEM (Block Element Modifier) convention for naming CSS classes to maintain clarity and consistency (e.g., `.header__nav`).

------

## 3. **Framework and Library Usage**

- **Vue.js**:
  - Use `Vue 3.x` with `Composition API`. Avoid using `Options API` unless absolutely necessary.
  - Avoid using `v-if` and `v-for` on the same element. They should be split into separate elements.
  - Always declare types for `props` in components, and use `required` or `default` as necessary for validation.
- **Vue Router**:
  - Use lazy loading (code splitting) for components to reduce the initial bundle size.
  - Use named views when managing complex page layouts.
- **State Management (Vuex)**:
  - Use Vuex for global state management, and avoid using global variables for state storage.
  - Keep state names short and relevant to the business logic.

------

## 4. **Functions and Methods**

- **Function Length**: Functions should not be too long. A typical function should not exceed 50 lines of code.

- **Function Responsibility**: A function should do one thing only. Follow the "Single Responsibility Principle".

- **Callbacks**: Avoid deep callback chains; use `async/await` instead of callbacks.

- **Arrow Functions**: Prefer arrow functions for their cleaner syntax and lexically bound `this`.

  ```js
  // Using arrow function
  const fetchData = async () => {
    const response = await fetch(url);
    return response.json();
  };
  ```

------

## 5. **Code Structure**

- File Organization:

  - Components: Each component should have its own directory, containing the `.vue` file, `style`, `script`, and `test` files (if applicable).
  - Logic Separation: Place utility functions, API wrappers, and helper functions in `src/utils`.
  - Styles: Use `SCSS` for styles and organize them into multiple files by feature module to avoid global styles.

- Directory Structure:

  ```txt
  ├── src
  │   ├── assets        // Static resources like images, fonts
  │   ├── components    // Reusable UI components
  │   ├── views         // Page views
  │   ├── router        // Router configuration
  │   ├── store         // Vuex state management
  │   ├── utils         // Utility functions
  │   ├── api           // API calls
  │   └── styles        // Global styles
  └── public            // Public assets (index.html)
  ```

------

## 6. **Asynchronous Operations & Error Handling**

- **Asynchronous Operations**: Always prefer `async/await` over traditional callbacks or `.then` chains.

- **Error Handling**:

  - Always use `try/catch` blocks to handle asynchronous errors, rather than using `console.log()` for errors.
  - Display user-friendly error messages in the UI and guide users on what to do next.

  ```js
  try {
    const data = await fetchData();
  } catch (error) {
    console.error(error);
    this.errorMessage = 'Failed to load data. Please try again later.';
  }
  ```

------

## 7. **Testing and Debugging**

- Unit Testing:
  - Use testing frameworks like `Jest` or `Mocha` for unit testing.
  - Write unit tests for all components and functions to ensure correctness.
- Debugging:
  - Use browser developer tools for debugging. Remove any `console.log()` or other debugging statements before committing code.

------

## 8. **Version Control**

- Commit Guidelines:

  - Use semantic commit messages in the format:

    ```bash
    feat: add new feature
    fix: fix a bug
    docs: update documentation
    style: fix code style issues
    refactor: code refactoring
    ```

- Branch Management:

  - Use `feature/{feature-name}` branches for feature development and submit a Pull Request (PR) to the `develop` branch.
  - The `master` branch should only be used for production releases.

------

## 9. **Performance Optimization**

- **Image Optimization**: Always use appropriately sized images to avoid large file sizes.
- **Lazy Loading**: Lazy load non-essential components to improve the first-page load time.
- **Caching**: Use browser cache, `LocalStorage`, or `SessionStorage` for non-sensitive data to avoid redundant network requests.

------

## 10. **Code Quality Tools**

- **ESLint**: Use ESLint to enforce consistent code style and identify potential issues.
- **Prettier**: Use Prettier to automatically format your code to ensure readability and consistency.
- **Stylelint**: Use Stylelint to check for issues in your CSS or SCSS files.

------

## 11. **Documentation and Comments**

- **Class and Function Comments**: Every class and function should have brief comments describing its purpose and functionality.

  ```js
  /**
   * Fetch user data from the API
   * @returns {Promise<User>} The user data
   */
  const getUserData = async () => {
    const response = await fetch('/api/user');
    return response.json();
  };
  ```

- **TODO Comments**: For unfinished work, use `TODO` comments with the developer's initials.

  ```js
  // TODO: Refactor data loading logic - JS
  ```

------

## 12. **Security Guidelines**

- **Input Validation**: Always validate user inputs to prevent XSS, SQL injection, and other security vulnerabilities.
- **Sensitive Data Encryption**: Ensure sensitive data (such as passwords, tokens) is encrypted when stored or transmitted.
- **CSRF Protection**: Use CSRF tokens to protect against cross-site request forgery (CSRF) attacks.

------

### **Appendix**

For any questions or further modifications to the style guide, please reach out to the development team.
