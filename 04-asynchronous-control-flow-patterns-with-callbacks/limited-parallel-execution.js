const task = (number, cb) => {
  setTimeout(() => {
    console.log(`Task ${number} completed!`);
    cb();
  }, 1000);
};

const tasks = [task, task, task, task];

const concurrency = 2;
let running = 0;
let completed = 0;
let index = 0;

function next() {
  while (running < concurrency && index < tasks.length) {
    const task = tasks[index++];
    task(index, () => {
      if (++completed === tasks.length) {
        finish();
      }
      running--;
      next();
    });
    running++;
  }
}

next();

function finish() {
  console.log("All tasks have been finished!");
}
