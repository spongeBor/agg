export default {};
class Scheduler {
  constructor(limit: number) {
    this.queue = [];
    this.limit = limit;
    this.count = 0;
  }
  private queue: Array<any>;
  private limit: number;
  private count: number;

  add(time: number, order: string) {
    const promiseCreator = () => {
      return new Promise((resolve: Function, reject: Function) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time);
      });
    };
    this.queue.push(promiseCreator);
  }

  taskStart() {
    for (let i = 0; i < this.limit; i++) {
      this.request();
    }
  }

  request() {
    if (!this.queue.length || this.count >= this.limit) return;
    this.count++;
    this.queue
      .shift()()
      .then(() => {
        this.count--;
        this.request();
      });
  }
}

// 测试
const scheduler = new Scheduler(2);
const addTask = (time: number, order: string) => {
  scheduler.add(time, order);
};
addTask(1000, '1');
addTask(500, '2');
addTask(500, '3');
addTask(400, '4');
scheduler.taskStart();
