export default {};
function fn1(x: number) {
  return x + 1;
}
function fn2(x: number) {
  return x + 2;
}
function fn3(x: number) {
  return x + 3;
}
function fn4(x: number) {
  return x + 4;
}
const aaa = compose(fn1, fn2, fn3, fn4);
console.log(aaa);
console.log(aaa(1)); // 1+2+3+4=11

/**
 * compose函数实现了函数组合，相当于将多个函数嵌套调用简化为一个函数
 * 例如：compose(fn1, fn2, fn3, fn4)(x) 相当于 fn4(fn3(fn2(fn1(x))))
 *
 * 这个实现相当于：
 * 1. 如果没有传入函数，返回一个透传函数
 * 2. 如果只传入一个函数，直接返回该函数
 * 3. 如果传入多个函数，使用reduce从右到左组合函数
 *    - 先执行最左边的函数
 *    - 将结果传给下一个函数
 *    - 依次执行直到最后一个函数
 *
 * 本质上是一种函数式编程中的高阶函数，用于函数流水线处理
 */
function compose(...fn: any) {
  if (fn.length === 0) return (num: any) => num;
  if (fn.length === 1) return fn[0];
  return fn.reduce((pre: any, next: any) => {
    return (num: any) => {
      return next(pre(num));
    };
  });
}
