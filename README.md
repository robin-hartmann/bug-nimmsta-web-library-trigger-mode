# 📄 template-node-ts

Project Template for creating Node.js apps with TypeScript

## ⭐ Features

- Code in TypeScript
- Run TypeScript code using `ts-node`
- Built-in tasks using npm scripts
- Integration with Visual Studio Code
  - Settings
  - Tasks
  - Debuging
  - Extensions
    - Automatic code checking with ESLint
    - Automatic code formatting and fixing with Prettier

## 🛠️ Development

These instructions will get you a copy of this project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

- [Node.js](https://nodejs.org) - JavaScript run-time environment
  - After installing it, use `npm i` in the project's root folder to install all dependencies

#### Visual Studio Code Extensions

This project is intended to be used with Visual Studio Code and the following extensions are recommended:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Integrates ESLint JavaScript into VS Code
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatter using prettier

### 🚀 Getting Started

This project uses npm scripts for running tasks:

```bash
# lint the project using eslint
npm run lint

# removes the generated folder
npm run clean

# build the project
# (includes clean and lint)
npm run build

# build the project without linting
# (includes clean)
npm run build-only

# run TypeScript code using ts-node
npm run start:ts
# or just
npm start

# run generated JavaScript code using node
# (does NOT include build)
npm run start:js

# publish the project
# (includes build)
npm publish
```

VS Code tasks are also included for `lint`, `build`, `build-only`, `start:ts` and `start:js`.

## 🧰 Built With

### 📚 Resources

- [`.eslintrc.js` from `create-exposed-app`](https://github.com/iamturns/create-exposed-app/blob/master/.eslintrc.js)

### 🏛️ Libraries

- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript
- [ESLint](https://eslint.org/) - Find and fix problems in your JavaScript code
- [ts-node](https://github.com/TypeStrong/ts-node) - TypeScript execution and REPL for node.js

## 👨‍💻 Authors

- **Robin Hartmann** - [robin-hartmann](https://github.com/robin-hartmann)

## 📃 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
