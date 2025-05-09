export default {};
class EventEmitter {
  constructor() {
    this.cache = {};
  }
  private cache: { [str: string]: Array<Function> };
  on(name: string, fn: Function) {
    const tasks = this.cache[name];
    if (tasks) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }

  off(name: string, fn: Function) {
    const tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex((item: Function) => item === fn);
      if (index >= 0) {
        this.cache[name].splice(index, 1);
      }
    }
  }
  emit(name: string, ...args: any) {
    const tasks = this.cache[name].slice();
    if (tasks) {
      for (let fn of tasks) {
        fn(...args);
      }
    }
  }
  once(name: string, cb: Function) {
    const fn = (...args: any) => {
      cb(args);
      this.off(name, fn);
    };
    this.on(name, fn);
  }
}
