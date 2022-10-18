/*
Modify the asynchronous FindRegex class so that it emits an event when the find process starts,
passing the input files list as an argument: Hint: beware of Zalgo!
*/

import { EventEmitter } from "events";
import { readFile } from "fs";

class findRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }
  addFile(file) {
    this.files.push(file);
    return this;
  }
  find() {
    this.emit("find", this.files);
    console.log("files", this.files);
    for (const file of this.files) {
      readFile(file, "utf8", (err, content) => {
        if (err) {
          return this.emit("error", err);
        }
        this.emit("fileread", file);
        const match = content.match(this.regex);
        if (match) {
          match.forEach((element) => this.emit("found", file, element));
        }
      });
    }
    return this;
  }
}

const findRegexInstance = new findRegex(/hello\w+/);
findRegexInstance
  .addFile("./assets/fileA.txt")
  .addFile("./assets/fileB.json")
  .on("find", (files) =>
    console.log(`Find started with the next files: ${files}`)
  )
  .find()
  .on("found", (file, match) => console.log(`Matched ${match} in file ${file}`))
  .on("error", (err) => console.error(`Error emitted ${err.message}`))
  .on("fileread", (file) => console.log(`Find found with path: ${file}`));
