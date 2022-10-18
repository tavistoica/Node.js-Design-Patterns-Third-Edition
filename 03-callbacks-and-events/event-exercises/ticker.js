import { EventEmitter } from "events";

const emitter = new EventEmitter();

// emitter.on("tick", (number, callback) => ticker(number - 50, callback));
emitter.on("error", (err) => console.log(`Error ${err}`));

const ticker = (number, callback) => {
  if (Date.now() % 5 === 0) {
    emitter.emit("error", `Timestamp is divisible with 5`);
  }
  console.log("ticker started with number:", number);
  if (number > 0) emitter.emit("tick", number, callback);
  else {
    callback();
  }

  return emitter;
};

emitter.on("tick", (number, callback) => {
  setTimeout(() => ticker(number - 50, callback), 50);
});

ticker(500, (err) => {
  if (err) console.log(`Error ${err}`);
  console.log("finished ticking");
});
