export default {};

/**
 * 函数上下文绑定方法规范
 *
 * 1. call方法规范
 *    - 语法：function.call(thisArg, arg1, arg2, ...)
 *    - 参数：
 *        - thisArg: 在function函数运行时使用的this值
 *        - arg1, arg2, ...: 指定的参数列表
 *    - 返回值：使用调用者提供的this值和参数调用该函数的返回值
 *    - 特性：
 *        - 如果thisArg为null或undefined，在非严格模式下this指向全局对象
 *        - 立即执行函数
 *
 * 2. apply方法规范
 *    - 语法：function.apply(thisArg, [argsArray])
 *    - 参数：
 *        - thisArg: 在function函数运行时使用的this值
 *        - argsArray: 参数数组，或者类数组对象
 *    - 返回值：使用调用者提供的this值和参数调用该函数的返回值
 *    - 特性：
 *        - 如果thisArg为null或undefined，在非严格模式下this指向全局对象
 *        - 立即执行函数
 *        - 第二个参数必须是数组或类数组对象
 *
 * 3. bind方法规范
 *    - 语法：function.bind(thisArg[, arg1[, arg2[, ...]]])
 *    - 参数：
 *        - thisArg: 在function函数运行时使用的this值
 *        - arg1, arg2, ...: 当目标函数被调用时，预设的参数列表
 *    - 返回值：返回一个原函数的拷贝，并拥有指定的this值和初始参数
 *    - 特性：
 *        - 如果thisArg为null或undefined，在非严格模式下this指向全局对象
 *        - 返回的新函数可以作为构造函数使用(本实现未包含此功能)
 *        - 不会立即执行原函数，而是返回一个新函数
 *        - 新函数被执行时可以传入额外参数，会与预设参数合并
 */

/**
 * 手写实现函数的上下文绑定方法：call, apply, bind
 */

// 声明全局变量，用于非浏览器环境
declare const global: any;

// 扩展Function接口，添加自定义方法
declare global {
  interface Function {
    myCall(thisArg: any, ...args: any[]): any;
    myApply(thisArg: any, argsArray?: any[]): any;
    myBind(thisArg: any, ...args: any[]): Function;
  }
}

/**
 * call方法实现
 * 功能：改变函数的this指向，并立即执行函数
 * @param thisArg 希望绑定的this值，如果传入null或undefined则默认为全局对象
 * @param args 函数执行时的参数列表
 * @returns 函数执行的结果
 */
Function.prototype.myCall = function (thisArg: any, ...args: any[]): any {
  // 处理thisArg为null或undefined的情况，将其设置为全局对象
  thisArg = thisArg || (typeof window !== "undefined" ? window : global);

  // 为thisArg创建一个独有的属性，避免属性名冲突
  const fn = Symbol("fn");

  // 将当前函数作为thisArg的方法
  thisArg[fn] = this;

  // 执行函数并获取结果
  const result = thisArg[fn](...args);

  // 删除添加的临时属性
  delete thisArg[fn];

  // 返回函数执行结果
  return result;
};

/**
 * apply方法实现
 * 功能：改变函数的this指向，并立即执行函数，参数以数组形式传入
 * @param thisArg 希望绑定的this值，如果传入null或undefined则默认为全局对象
 * @param argsArray 函数执行时的参数数组
 * @returns 函数执行的结果
 */
Function.prototype.myApply = function (thisArg: any, argsArray?: any[]): any {
  // 处理thisArg为null或undefined的情况，将其设置为全局对象
  thisArg = thisArg || (typeof window !== "undefined" ? window : global);

  // 为thisArg创建一个独有的属性，避免属性名冲突
  const fn = Symbol("fn");

  // 将当前函数作为thisArg的方法
  thisArg[fn] = this;

  // 执行函数并获取结果，处理参数不存在的情况
  const result = argsArray ? thisArg[fn](...argsArray) : thisArg[fn]();

  // 删除添加的临时属性
  delete thisArg[fn];

  // 返回函数执行结果
  return result;
};

/**
 * bind方法实现
 * 功能：创建一个新函数，该函数的this被指定为提供的值，在调用新函数时，提供一组参数列表
 * @param thisArg 希望绑定的this值，如果传入null或undefined则默认为全局对象
 * @param args 函数执行时的预设参数列表
 * @returns 绑定this和预设参数后的新函数
 */
Function.prototype.myBind = function (thisArg: any, ...args: any[]): Function {
  // 保存原函数的引用
  const self = this;

  // 处理thisArg为null或undefined的情况，将其设置为全局对象
  thisArg = thisArg || (typeof window !== "undefined" ? window : global);

  // 返回一个新函数
  return function (this: any, ...newArgs: any[]): any {
    // 合并预设参数和新传入的参数
    const finalArgs = args.concat(newArgs);

    // 使用apply方法调用原函数，并传入绑定的this和最终参数列表
    return self.apply(thisArg, finalArgs);
  };
};

/**
 * 测试示例
 */
// 测试对象
const person = {
  name: "张三",
  sayHello: function (greeting: string, punctuation: string) {
    return `${greeting}, 我是${this.name}${punctuation}`;
  },
};

// 测试函数
function introduce(age: number, hobby: string) {
  return `我是${this.name}，今年${age}岁，爱好是${hobby}。`;
}

// 测试对象2
const student = {
  name: "李四",
};

// call方法测试
console.log(introduce.myCall(student, 20, "编程")); // 我是李四，今年20岁，爱好是编程。

// apply方法测试
console.log(introduce.myApply(student, [22, "阅读"])); // 我是李四，今年22岁，爱好是阅读。

// bind方法测试
const boundFn = introduce.myBind(student, 25);
console.log(boundFn("游泳")); // 我是李四，今年25岁，爱好是游泳。
