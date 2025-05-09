export default {};
// 第一种方法
var a = {
  i: 1,
  toString: function () {
    return a.i++;
  },
};
console.log(a == 1 && a == 2 && a == 3);
// 第二种方法
var a = [1, 2, 3];
a.join = a.shift;
console.log(a == 1 && a == 2 && a == 3);
// 第三种方法
var val = 0;
Object.defineProperty(window, "a", {
  get: function () {
    return ++val;
  },
});
console.log(a == 1 && a == 2 && a == 3);
