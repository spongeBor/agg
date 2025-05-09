export default {};

/**
 * 柯里化函数实现
 *
 * 柯里化是一种将接受多个参数的函数转换为一系列使用一个参数的函数的技术。
 * 这种技术可以让我们部分地应用函数参数，并在需要时再提供剩余参数。
 *
 * 实现思路：
 * 1. 保存原始函数的参数个数
 * 2. 返回一个新函数，该函数收集参数
 * 3. 当收集到的参数数量达到原始函数需要的参数数量时，执行原始函数
 * 4. 否则返回一个新函数继续收集参数
 *
 * @param fn 需要柯里化的函数
 * @returns 柯里化后的函数
 */
function curry<T extends (...args: any[]) => any>(
  fn: T
): (...args: any[]) => any {
  // 获取原始函数需要的参数个数
  const arity = fn.length;

  // 定义一个收集参数的辅助函数
  function curried(...args: any[]): any {
    // 如果已收集的参数数量大于等于原始函数需要的参数数量
    if (args.length >= arity) {
      // 执行原始函数
      return fn(...args);
    } else {
      // 否则返回一个新函数继续收集参数
      return function (...moreArgs: any[]): any {
        // 将已收集的参数和新参数合并，递归调用
        return curried(...args, ...moreArgs);
      };
    }
  }

  return curried;
}

// 测试示例
function add(a: number, b: number, c: number): number {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6

// 更复杂的示例
function formatString(template: string, name: string, age: number): string {
  return template.replace("{name}", name).replace("{age}", age.toString());
}

const curriedFormat = curry(formatString);
const formatPerson = curriedFormat("我叫{name}，今年{age}岁");
const formatZhangSan = formatPerson("张三");

console.log(formatZhangSan(25)); // "我叫张三，今年25岁"
