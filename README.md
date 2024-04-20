# Simple Calculator
A simple calculator application written in HTML, CSS and Javascript. Created for educational purposes.
A simple and user-friendly UI (that supports keyboard and mouse input) with the base features that a calculator needs.

## Project Overview
### Input System
The input system handles basic calculator functionalities through four main functions:

- `appendData(enum dataType, string)`: Appends data of a specified type (number or operator) to the input array.
- `updateScreen(string)`: Updates the screen text with the specified string.
- `clearScreen()`: Clears the screen and resets the input array.
- `deleteLast()`: Deletes the last inputted character or element from the screen and input array.

Internally, an array (`inputArray`) manages all inputted data to ensure validity and facilitate backspace functionality.

Additionally, there's a keyboard input handler function (`treatKeyboardInput(event)`) connected to `document.addEventListener('keydown', treatKeyboardInput)` to support keyboard input alongside mouse input.

Near the end of the script, there's a system implemented to prevent buttons from capturing keyboard input.
### Execution System
The execution system is based on evaluating postfix expressions to compute results. It involves the following steps:

1. Inputted expressions are converted into postfix notation using a stack-based algorithm.
2. Postfix expressions are then solved using a stack-based approach, applying operators according to their precedence.
3. Results are displayed on the screen after evaluation.

These functionalities facilitate basic arithmetic operations and support the calculator's core functionality.
## Authors
- [@Gukisz](https://www.github.com/gukisz) - HTML, CSS
- [@arthur-manske](https://github.com/arthur-manske) - JavaScript
