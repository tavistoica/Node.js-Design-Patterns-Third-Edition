import { readFile, writeFile, appendFileSync } from "fs";
import mkdirp from "mkdirp";
import path from "path";

function fileContent(filePath, cb) {
  readFile(filePath, "utf8", (err, data) => {
    if (err) {
      cb(err);
    }
    cb(null, data);
  });
}

const saveFile = (filename, cb) => {
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      return cb(err);
    }
    writeFile(filename, "", cb);
  });
};

function concatFiles(...args) {
  const argsLength = args.length;
  const callback = args[argsLength - 1];

  const destinationFile = args[argsLength - 2];
  saveFile(destinationFile, (err) => {
    if (err) {
      return callback(err);
    }
  });

  for (let i = 0; i < argsLength - 2; i++) {
    fileContent(args[i], (err, data) => {
      if (err) {
        return callback(err);
      }

      try {
        appendFileSync(destinationFile, data);
      } catch (err) {
        callback(err);
      }
    });
  }

  callback(null, "finished succesfully");
}

concatFiles(
  "./assets/file1.txt",
  "./assets/file2.txt",
  "./assets/file3.txt",
  "./assets/destination.txt",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  }
);
