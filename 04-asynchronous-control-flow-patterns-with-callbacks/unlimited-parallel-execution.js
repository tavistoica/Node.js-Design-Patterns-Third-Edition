const task = (number, cb) => {
  setTimeout(() => {
    console.log(`Task ${number} completed!`);
    cb();
  }, 1000);
};

const tasks = [task, task, task, task];

let completed = 0;
tasks.forEach((task, index) => {
  task(index, () => {
    if (++completed === tasks.length) {
      finish();
    }
  });
});

function finish() {
  console.log("All tasks have been finished!");
}
