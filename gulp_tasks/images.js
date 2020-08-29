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
    options: {
      width: 600,
      height: 450,
      fit: "cover"
    }
  },
  {
    src: "./src/assets/img/books/*",
    dist: "./dist/assets/img/books/_300x480/",
    options: {
      width: 300,
      height: 480,
      fit: "cover"
    }
  }
];

// make sure paths do not end with slash
function sanitizePath(filepath) {
  let sanitizedFilepath = filepath;
  if (filepath.slice(-1) === "/") {
    sanitizedFilepath = filepath.slice(0, -1);
  }
  return sanitizedFilepath;
}

// resize images
function resizeImages(done) {
  transforms.forEach(function (transform) {
    // if folder does not exist create it with all above folders
    if (!fs.existsSync(transform.dist)) {
      fs.mkdirSync(transform.dist, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }

    // glob all files
    let files = glob.sync(transform.src);

    // for each file, apply transforms and save to file
    files.forEach(function (file) {
      let filename = path.basename(file);
      sharp(file)
        .resize(transform.options)
        .toFile(`${sanitizePath(transform.dist)}/${filename}`)
        .catch((err) => {
          console.log(err);
        });
    });
  });
  done();
}

// exports (Common JS)
module.exports = {
  resize: resizeImages
};
