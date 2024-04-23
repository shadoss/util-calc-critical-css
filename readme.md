Certainly! Here's a README for your code:

---

# CSS Size Validator

This module provides functions to validate the size of CSS files, primarily intended for development environments. It checks if the critical CSS size is under a specified limit for both desktop and mobile screens and outputs the results to log files and the console.

## Usage

```javascript
const { calcCssSize, clearDirectory } = require("css-size-validator");

// Example usage
const css = "/* Your CSS code here */";
const page = "home";
const logname = "style";
const screen = "Desktop";

calcCssSize(css, page, logname, screen)
  .then(() => console.log("CSS size validation complete."))
  .catch((err) => console.error("Error validating CSS size:", err));

// Clear log directory
clearDirectory("./.log")
  .then(() => console.log("Log directory cleared."))
  .catch((err) => console.error("Error clearing log directory:", err));
```

## Functions

### `calcCssSize(css, page, logname, screen)`

- **Parameters:**
    - `css`: CSS code to be validated.
    - `page`: Name of the page being validated.
    - `logname` (Optional): Name of the log file. Default is "style".
    - `screen`: Screen type (e.g., "Desktop", "Mobile").

- **Description:**
  Validates if the critical CSS size is under a specified limit (14.6kb) for desktop and mobile screens. Results are printed in log files and console.

### `clearDirectory(dir)`

- **Parameters:**
    - `dir`: Directory path to be cleared.

- **Description:**
  Clears the specified directory of all files.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

--- 

Feel free to adjust any details or add additional sections as needed!
