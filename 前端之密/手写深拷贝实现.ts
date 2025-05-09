export default {};
/**
 * 实现一个深拷贝函数
 * @param target 需要拷贝的目标
 * @returns 深拷贝后的新对象
 */
function deepClone<T>(target: T, map = new WeakMap<object, any>()): T {
  // 处理基本类型和null
  if (target === null || typeof target !== "object") {
    return target;
  }

  // 处理日期对象
  if (target instanceof Date) {
    return new Date(target.getTime()) as unknown as T;
  }

  // 处理正则表达式
  if (target instanceof RegExp) {
    return new RegExp(target) as unknown as T;
  }

  // 处理Map
  if (target instanceof Map) {
    const result = new Map();
    target.forEach((value, key) => {
      result.set(key, deepClone(value, map));
    });
    return result as unknown as T;
  }

  // 处理Set
  if (target instanceof Set) {
    const result = new Set();
    target.forEach((value) => {
      result.add(deepClone(value, map));
    });
    return result as unknown as T;
  }

  // 检查循环引用
  if (map.has(target as object)) {
    return map.get(target as object);
  }

  // 创建新对象或数组
  const cloneTarget: any = Array.isArray(target) ? [] : {};

  // 保存当前对象到WeakMap中，用于处理循环引用
  map.set(target as object, cloneTarget);

  // 处理对象和数组
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepClone((target as any)[key], map);
    }
  }

  return cloneTarget as T;
}

// 测试用例
function testDeepClone() {
  // 测试基本类型
  console.log(deepClone(1)); // 1
  console.log(deepClone("string")); // string
  console.log(deepClone(true)); // true
  console.log(deepClone(null)); // null
  console.log(deepClone(undefined)); // undefined

  // 测试复杂对象
  const obj: any = {
    a: 1,
    b: { c: 2 },
    d: [1, 2, 3],
    e: new Date(),
    f: /test/g,
    g: new Map([["key", "value"]]),
    h: new Set([1, 2, 3]),
  };

  // 创建循环引用
  obj.self = obj;

  const clonedObj = deepClone(obj);

  // 验证是否为深拷贝
  console.log(clonedObj !== obj); // true
  console.log(clonedObj.b !== obj.b); // true
  console.log(clonedObj.d !== obj.d); // true

  // 验证值是否相同
  console.log(clonedObj.a === obj.a); // true
  console.log(clonedObj.b.c === obj.b.c); // true
  console.log(clonedObj.self === clonedObj); // true，循环引用指向克隆后的对象
}

// 取消注释以运行测试
// testDeepClone();
