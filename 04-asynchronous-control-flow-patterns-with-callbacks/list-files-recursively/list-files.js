import { readdir } from "fs";

function getDirectories(path, status, cb) {
  status.processes += 1;
  readdir(path, { withFileTypes: true }, (err, files) => {
    if (err) {
      return cb(err);
    }
    if (files.length > 0) {
      files.forEach((file) => {
        if (file.isDirectory()) {
          getDirectories(`${path}/${file?.name}`, status, cb);
        }
      });
    }
    cb(
      null,
      files.filter((file) => file.isDirectory()).map((file) => file.name)
    );
  });
}

function listNestedFiles(dir, cb) {
  const finalArr = [];
  const status = {
    processes: 0,
    completed: 0,
  };

  getDirectories(dir, status, (err, files) => {
    if (err) {
      return cb(err);
    }
    status.completed++;
    if (files.length > 0) {
      files.forEach((item) => {
        finalArr.push(item);
      });
    }
    if (status.completed === status.processes) {
      cb(null, finalArr);
    }
  });
}

listNestedFiles("./", (err, files) => {
  if (err) {
    return console.error(err);
  }
  console.log("Result", files);
});
