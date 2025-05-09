export default {};
// 1. 比较版本
// 12.3.1
// 12.7.8
// 1.5.6-alpha.1
// 7.2.3-beta

function* walk(str: string) {
  let part = "";
  const terminal = [".", "-"];
  for (let i = 0; i < str.length; i++) {
    if (terminal.includes(str[i])) {
      // 终结符
      yield part;
      part = "";
    } else {
      part += str[i];
    }
  }
  if (part) {
    yield part;
  }
}

const iterator = walk("1.5.6-alpha.1");
for (const item of iterator) {
  console.log(item);
}

// 2.闭包泄漏
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
Object.defineProperty(Object.prototype, "abc", {
  get() {
    return this;
  },
});
console.log(o.get("abc"));

// 3. var [a, b] = {a: 1, b: 2}; 成立
// 要使这个解构赋值成立，需要让对象实现迭代器协议
Object.prototype[Symbol.iterator] = function () {
  return Object.values(this)[Symbol.iterator]();
};

// 测试
var [a, b] = { a: 1, b: 2 };
console.log(a, b); // 1 2

// 注意：在实际项目中不建议修改Object.prototype，这里只是为了演示

// 4. 统计字符串出现的频率

const strr = "fgadfsakrlewquiorewq";
const result = strr.split("").reduce((a: any, b: any) => {
  a[b]++ || (a[b] = 1);
  return a;
}, {});
console.log(result);
