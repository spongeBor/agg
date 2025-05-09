export default {};
/**
 * 自定义实现instanceof操作符
 * instanceof用于检测构造函数的prototype属性是否出现在对象的原型链上
 * @param obj 要检测的对象
 * @param constructor 构造函数
 * @returns boolean 表示obj是否是constructor的实例
 */
function myInstanceOf(obj: any, constructor: Function): boolean {
  // 如果obj不是对象或为null，直接返回false
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return false;
  }

  // 获取对象的原型
  // 获取对象的原型，相当于obj.__proto__
  let proto = Object.getPrototypeOf(obj);

  // 获取构造函数的原型对象
  const prototype = constructor.prototype;

  // 遍历原型链
  while (proto !== null) {
    // 如果在原型链上找到了构造函数的原型对象，返回true
    if (proto === prototype) {
      return true;
    }
    // 沿着原型链向上查找
    proto = Object.getPrototypeOf(proto);
  }

  // 遍历完整个原型链都没找到，返回false
  return false;
}

// 测试用例
class Animal {}
class Dog extends Animal {}

const animal = new Animal();
const dog = new Dog();

console.log(myInstanceOf(dog, Dog)); // true
console.log(myInstanceOf(dog, Animal)); // true
console.log(myInstanceOf(animal, Dog)); // false
console.log(myInstanceOf(animal, Animal)); // true
console.log(myInstanceOf({}, Object)); // true
console.log(myInstanceOf(null, Object)); // false
console.log(myInstanceOf(1, Number)); // false (原始类型不是实例)
