# 🐞 bug-nimmsta-web-library-trigger-mode

Minimal working example for reproducing a bug when quickly switching the trigger mode of a NIMMSTA HS50 scanner using nimmsta-web-library

## 🛠️ Development

These instructions will get you a copy of this project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

- [Node.js](https://nodejs.org) - JavaScript run-time environment
- [NIMMSTA HS 50 BT](https://nimmsta.com/wp-content/uploads/2020/11/522112-HS-50-BT-data-sheet-11-12-2020.pdf)
- [NIMMSTA APP](https://play.google.com/store/apps/details?id=com.nimmsta)

### 🚀 Getting Started

Follow these steps to reproduce the bug:

1. With your computer
   1. Clone this project
   1. Open the terminal and navigate to the project's root folder
   1. Run `npm i` in the terminal to install all dependencies
   1. Run `npm run serve` in the terminal to build the project and then serve it on a local web server
   1. Look at the terminal's output and take note at which address the server is available (ip and port)
1. With your Android device with NIMMSTA APP installed and fully set up
   1. Connect to the web server using the browser
   1. Connect your HS 50, if it isn't connected already
   1. Make sure the first input field is focused
1. With your NIMMSTA HS 50 BT
   1. Start scanning as quickly as possible and keep going

Each time you scan something the scanned data should appear in the currently focused input field and then the focus should move to the next input field (or the first, if you reached the end) and that input field should get cleared.
Below the input fields and the buttons you should see a label with the state in which the scanner should be - it should say `scanner should be enabled`.

You should be able to keep scanning indefinitely, but the scanner will randomly stop and then stay disabled, even though the label says `scanner should be enabled`.
In order to continue you have to tap `Enable Scanner`.
Also, sometimes the scanner stops temporarily, beeps three times with red flashing LEDs and a toast is shown with the message `Scan not valid 0013 Đ. Wrong length 19 vs. Barcode Length 2 of Đ` (the values change between incidents, but the message largely stays the same).

To stop the server hit CTRL+C in the terminal.

### 🌐 About the web page

Each time an input field gets focus the scanner gets enabled using `device.preferredTriggerMode = TriggerMode.ButtonAndTouch`.

Each time an input field loses focus the scanner gets disabled using `device.preferredTriggerMode = TriggerMode.Disabled`.

The purpose of this setup is that the scanner should only be able to scan when an input field is focused.

### 📋 Tested with

| Component                    | Version          |
| ---------------------------- | ---------------- |
| NIMMSTA Web Library          | `5.0.514`        |
| NIMMSTA Core Library Shared  | `5.0-3666`       |
| NIMMSTA Core Library Android | `5.0-2445`       |
| NIMMSTA App                  | `5.3.1-3704`     |
| HS 50 Hardware               | `03.00-0`        |
| HS 50 Firmware               | `01.14-703`      |
| HS 50 Loader                 | `01.13-703`      |
| HS 50 Protocol               | `01.03-0`        |
| HS 50 Imager                 | `AEOS00002R00FX` |
| HS 50 BLE                    | `05.00-352`      |
| HS 50 BLE FW                 | `30.1.1.0`       |
| HS 50 Touch Controller       | `10`             |

## 🧰 Built With

### 📚 Resources

- [`.eslintrc.js` from `create-exposed-app`](https://github.com/iamturns/create-exposed-app/blob/master/.eslintrc.js)

### 🏛️ Libraries

- [bind-decorator](https://github.com/NoHomey/bind-decorator#readme) - Context method binding decorator
- [ESLint](https://eslint.org/) - Find and fix problems in your JavaScript code
- [http-server](https://github.com/http-party/http-server#readme) - A simple static HTTP server
- [NIMMSTA WEB LIBRARY](https://www.npmjs.com/package/nimmsta-web-library) - Communicate with the HS 50 via the Android App from your own Website
- [Prettier](https://prettier.io/) - Opinionated Code Formatter
- [rollup.js](https://rollupjs.org/) - Module bundler for JavaScript which compiles small pieces of code into something larger and more complex
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript

## 👨‍💻 Authors

- **Robin Hartmann** - [robin-hartmann](https://github.com/robin-hartmann)

## 📃 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
