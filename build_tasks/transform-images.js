// packages
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const sharp = require("sharp");

// specify transforms
const transforms = [
  {
    src: "./src/assets/img/databases/*",
    dist: "./dist/assets/img/databases/_600x450/",
    formats: ["jpg"],
    options: {
      width: 600,
      height: 450,
      fit: "cover",
    },
  },
  {
    src: "./src/assets/img/books/*",
    dist: "./dist/assets/img/books/",
    formats: ["webp"],
    options: {
      width: 600,
      height: 960,
      fit: "cover",
    },
  },
  {
    src: "./src/assets/img/books/*",
    dist: "./dist/assets/img/books/_300x480/",
    formats: ["jpg","webp"],
    options: {
      width: 300,
      height: 480,
      fit: "cover",
    },
  },
];

/**
 * Check supplied format is allowed
 * @param {string} format
 */
 function checkFormats(format) {
  const allowedFormats = ["jpg", "jpeg", "png", "webp", "avif"];

  if (!allowedFormats.includes(format)) {
    throw new Error(`${format} is not an allowed format: ${allowedFormats}`);
  }
}

/**
 * Create Directory recursively if not readable
 * @param {string} path - valid dir path
 */
function createDir(path) {
  if (fs.existsSync(path)) return;

  fs.mkdirSync(path, { recursive: true }, (err) => {
    if (err) throw err;
  });
}

/**
 * Resize Image
 * @param {string} scrPath - path of src image
 * @param {string} distPath - path of dist image
 * @param {format} format - format of dist image
 * @param {object} resizeOptions - Sharp resize options
 */
function resizeImage(scrPath, distPath, format, resizeOptions) {
  if (fs.existsSync(distPath)) return;
  resizeOptions.width ? parseInt(resizeOptions.width, 10) : null;
  resizeOptions.height ? parseInt(resizeOptions.height, 10) : null;

  sharp(scrPath)
    .toFormat(format)
    .resize(resizeOptions)
    .toFile(distPath)
    .catch((err) => {
      throw new Error(err);
    });
}

function init() {
  transforms.forEach((transform) => {
    // tests
    if (transform.src === undefined || 
        transform.dist === undefined || 
        transform.formats === undefined || 
        transform.options === undefined) {
      throw new Error(`src:(Glob), dist:(string), formats:(array) and options:(Object) must be defined for each transform`);
    }

    // create dist folder
    createDir(transform.dist);

    // glob all files
    let srcPaths = glob.sync(transform.src);

    // loop through files
    srcPaths.forEach((sourcePath) => {
      // get formats
      let formats = transform.formats;

      if (!Array.isArray(formats)) {
        throw new Error(`${formats} must be an array`);
      }

      // loop through formats
      formats.forEach((format) => {
        // check for allowed formats
        checkFormats(format);

        // get filename and output path
        let inputFilename = path.parse(sourcePath).name;
        let outputPath = path.normalize(
          `${transform.dist}/${inputFilename}.${format}`
        );

        // resize images
        resizeImage(sourcePath, outputPath, format, transform.options);
      });
    });
  });
}

module.export = init();