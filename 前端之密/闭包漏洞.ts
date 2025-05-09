export default {};
var o = (function () {
  var obj: any = {
    a: 1,
    b: 2,
  };
  return {
    get: function (k: any) {
      // return obj[k];
      // 解决
      if (obj.hasOwnProperty(k)) {
        return obj[k];
      }
      return undefined;
    },
  };
})();
//如何在不改变上面代码的情况下
// 修改 obj 对象
Object.defineProperty(Object.prototype, 'abc', {
  get() {
    return this;
  },
});
console.log(o.get('abc'));
