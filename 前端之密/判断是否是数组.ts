export default {};
const arr = [1, 2, 3];
// 方法1: 使用Array.isArray (ES5方法，推荐)
Array.isArray(arr);

// 方法2: 使用原型链判断 (不推荐，在TypeScript中__proto__已废弃)
// arr.__proto__ === Array.prototype;
Object.getPrototypeOf(arr) === Array.prototype;

// 方法3: 使用instanceof运算符
arr instanceof Array;

// 方法4: 使用Object.prototype.toString方法
Object.prototype.toString.call(arr) === "[object Array]";

// 方法5: 使用Array.prototype.isPrototypeOf
Array.prototype.isPrototypeOf(arr);

// 方法6: 使用构造函数
arr.constructor === Array;

// 方法7: 检查数组方法是否存在（不可靠，因为可能被修改）
typeof arr.push === "function" && typeof arr.slice === "function";

// 方法8: 使用duck typing检查length属性（不可靠）
typeof arr === "object" && arr !== null && typeof arr.length === "number";
