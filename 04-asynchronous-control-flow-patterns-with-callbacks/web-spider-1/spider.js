import fs from "fs";
import path from "path";
import superagent from "superagent";
import mkdirp from "mkdirp";
import { urlToFilename } from "./utils.js";

export function spider(url, cb) {
  const filename = urlToFilename(url);
  fs.access(filename, (err) => {
    if (err && err.code === "ENOENT") {
      console.log(`Downloading ${url} into ${filename}`);

      superagent.get(url).end((err, res) => {
        if (err) {
          cb(err);
        } else {
          console.log("path", path.dirname(filename), filename);
          mkdirp(path.dirname(filename), (err) => {
            console.log("err", err);
            if (err) {
              cb(err);
            } else {
              fs.writeFile(filename, res.text, (err) => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, filename, true);
                }
              });
            }
          });
        }
      });
    } else {
      cb(null, filename, false);
    }
  });
}
