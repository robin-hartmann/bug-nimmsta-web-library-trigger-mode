# 🐞 bug-nimmsta-web-library-trigger-mode

Minimal working example for reproducing bugs when quickly switching the trigger mode of a NIMMSTA HS 50 scanner using nimmsta-web-library

## 🛠️ Development

These instructions will get you a copy of this project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

- [Node.js](https://nodejs.org) - JavaScript run-time environment
- [NIMMSTA HS 50 BT](https://nimmsta.com/wp-content/uploads/2020/11/522112-HS-50-BT-data-sheet-11-12-2020.pdf)
- [NIMMSTA APP](https://play.google.com/store/apps/details?id=com.nimmsta)

### 🚀 Getting Started

Follow these steps to reproduce the bugs:

1. With your computer
   1. Clone this project
   1. Open the terminal and navigate to the project's root folder
   1. Run `npm i` in the terminal to install all dependencies
   1. Run `npm run serve` in the terminal to build the project and then serve it on a local web server
   1. Look at the terminal's output and take note at which address the server is available (ip and port)
1. With your Android device with NIMMSTA APP installed and fully set up
   1. Connect to the web server using the browser
   1. Connect your HS 50, if it isn't connected already
   1. Make sure `use setLayout:` is checked
   1. Make sure the first input field is focused
1. With your NIMMSTA HS 50 BT
   1. Start scanning as quickly as possible and keep going

Each time you scan something the scanned data should appear in the currently focused input field and then the focus should move to the next input field (or the first, if you reached the end) and that input field should get cleared.
Also, the screen on the HS 50 should only display the status bar and the last scanned data (or no data).
Below the input fields and the buttons you should see a label and a checked checkbox `use setLayout:` and a label with the state in which the scanner should be - it should say `scanner state: enabled`.
At the bottom you should see another label reading `no scan events yet`.
This last label will show a counter of how many scan events were received.
You should be able to keep scanning indefinitely without any interruptions.

But the following problems arise when doing this:

- frequent occurrences (I could reliably reproduce these)
  - the scan events received by the web page do not match the actual scans
    - some scans are concatenated into a single scan event and some scans don't trigger an event at all, even though the scanner sounded a beep
    - there should be exactly one scan event per beep (you can use the scan events counter to check this)
  - the screen displays the incorrect Layout
    - i.e. an input field is focused and the scanner is enabled, but the screen displays two buttons and a number instead of the last scanned data
  - (the screen displays GUI elements from a different layout (one or two buttons at the bottom and/or a number in the center) mixed in with the GUI elements it should actually be displaying)
    - I never managed to get this to stay, it only showed up this way before switching to a different Layout, so this isn't a big issue
- rare/irregular occurences (I couldn't reliably reproduce these)
  - the scanner stops and stays disabled
    - also, sometimes the screen displays the incorrect layout
    - i.e. an input field is focused and the scanner should be enabled, but it is disabled and the screen displays two buttons and a number instead of the last scanned data
  - the scanner stops, is disabled temporarily, it beeps and flashes the LEDs red three times
  - the LEDs flash red three times and no scan events are transmitted temporarily (the scanner doesn't stop, no beeps)
  - the scanner freezes and has to be restarted forcefully (trigger held and released after 30 seconds) to get working properly again

To stop the server hit CTRL+C in the terminal.

### 🌐 About the web page

Each time an input field receives focus the scanner gets enabled using `device.preferredTriggerMode = TriggerMode.ButtonAndTouch` and the layout is set using `device.setLayout(new SimpleScanLayout())`.

Each time an input field loses focus the scanner gets disabled using `device.preferredTriggerMode = TriggerMode.Disabled` and the layout is set using `device.setLayout(new InteractableLayout(this.counter.toString()))`.
And each time the `+` or `-` button is pressed on the screen of the HS 50 the counter is incremented or decremented and the layout is updated using `device.updateLayout({ counter: this.counter.toString() })`.

The purpose of this setup is that the scanner should only be able to scan when an input field is focused.
This should work reliably no matter how fast the user is scanning, even though a small delay would be acceptable.

### 📋 Tested with

The web page was opened on a Zebra MC330K and the following versions were used:

| Component                    | Version          |
| ---------------------------- | ---------------- |
| Android                      | `8.1.0`          |
| NIMMSTA Web Library          | `5.0.517`        |
| NIMMSTA Core Library Shared  | `5.0-3750`       |
| NIMMSTA Core Library Android | `5.0-2488`       |
| NIMMSTA App                  | `5.3.1-3721`     |
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
