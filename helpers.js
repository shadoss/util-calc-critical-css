const fs = require("fs");
const path = require("path");
const cssSize = require("css-size");
const nanoOpts = {
  from: undefined,
};

/**
 * @function calcCssSize
 * @param {string} css
 * @param {string} page
 * @param {string} logname
 * @param {string} screen
 * @description this is only for development enviroment,
 * validates if critical css is under 14.6kb for desktop and mobile
 * and prints the results in log files (per date) and in console.
 */

const calcCssSize = async (css, page, logname = "style", screen) => {
  const limit = 14950; // 14.6kb
  const Reset = "\x1b[0m";
  const FgBlack = "\x1b[30m";
  const FgYellow = "\x1b[33m";
  const FgCyan = "\x1b[36m";
  const FgBlue = "\x1b[34m";
  const BgRed = "\x1b[41m";
  const BgGreen = "\x1b[42m";
  const BgWhite = "\x1b[47m";

  const dir = "./.log";
  const date = new Date();

  const logFilename = `${dir}/inline.${logname}.size.${
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDate().toString()
  }.log`;

  const result_table = await cssSize.table(css, nanoOpts);
  const result_json = await cssSize.numeric(css, nanoOpts);
  const size_gzipped = result_json.gzip.original;

  const dirExists = await fs.existsSync(dir);
  if (!dirExists) {
    await fs.mkdirSync(dir);
  }

  const status = size_gzipped > limit;

  const sizeValidation = status ? " FAIL " : " PASS ";

  const sizeValidation_coloed = status
    ? BgRed + " FAIL " + Reset
    : BgGreen + FgBlack + " PASS " + Reset;

  const result = `\nDate ${date}\nValidation: ${sizeValidation} | ${screen} Page: ${page}\n${result_table}\n`;

  await fs.appendFileSync(logFilename, result);

  console.groupCollapsed(
    `\nInline ${
      FgBlue + BgWhite
    } ${logname} ${Reset} file size ${FgYellow}[${screen}]${Reset}: ${sizeValidation_coloed}`
  );
  console.log(result);
  console.groupEnd();
};

const clearDirectory = async (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(dir, file), (err) => {
        if (err) throw err;
      });
    }
  });
};

module.exports = {
  calcCssSize,
  clearDirectory,
};
