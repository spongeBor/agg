export default {};
/**
 * 实现 JavaScript 的 new 操作符
 * new 操作符的实现步骤：
 * 1. 创建一个新对象
 * 2. 将构造函数的 prototype 赋值给新对象的 __proto__
 * 3. 将构造函数内部的 this 指向新对象，并执行构造函数
 * 4. 判断构造函数返回值类型，如果是对象则返回该对象，否则返回新创建的对象
 */

function myNew(Constructor: Function, ...args: any[]): object {
  // 1. 创建一个新对象，并将其原型指向构造函数的prototype
  const obj = Object.create(Constructor.prototype);

  // 2. 执行构造函数，并将this指向新创建的对象
  const result = Constructor.apply(obj, args);

  // 3. 判断构造函数的返回值
  // 如果构造函数返回一个对象，则返回该对象
  // 否则返回新创建的对象
  return typeof result === "object" && result !== null ? result : obj;
}

// 测试示例
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    return `你好，我是${this.name}，今年${this.age}岁`;
  }
}

// 使用自定义 new 操作符创建实例
const person = myNew(Person, "张三", 25) as Person;
console.log(person.name); // 张三
console.log(person.age); // 25
console.log(person.sayHello()); // 你好，我是张三，今年25岁
console.log(person instanceof Person); // true
