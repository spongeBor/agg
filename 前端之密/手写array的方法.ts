export default {};

/**
 * 模拟实现数组的map方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.15
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 检查callback是否为函数，否则抛出TypeError
 * 5. 创建新数组A，长度与原数组相同
 * 6. 遍历数组每个索引，对存在的元素调用callback
 * 7. 将callback返回值存入新数组对应位置
 * 8. 返回新数组
 *
 * @param callback 回调函数，接收三个参数：当前元素、索引和原数组
 * @param thisArg 可选参数，执行callback时的this值
 * @returns 返回一个新数组，每个元素都是回调函数的返回值
 */
(<any>Array.prototype).myMap = function (callback, thisArg) {
  // 检查this是否为null或undefined，因为根据规范，如果调用者为null或undefined应该抛出TypeError
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }

  // 检查callback是否为函数，因为map方法需要一个函数作为参数来处理每个元素
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // 将this转换为对象，这是为了处理原始值的情况（如字符串），确保后续操作可以在对象上进行
  const O = Object(this);

  // 获取数组长度并进行无符号右移0位操作，这样可以将length转换为32位无符号整数
  // 这是为了处理length可能是非数字或负数的情况
  const len = O.length >>> 0;

  // 创建一个与原数组长度相同的新数组，用于存储map的结果
  // map方法不会修改原数组，而是返回一个新数组
  const A = new Array(len);

  // 遍历数组中的每个元素，k是索引
  for (let k = 0; k < len; k++) {
    // 检查索引k是否在数组中存在（处理稀疏数组的情况）
    // 只有当索引k在数组中存在时，才会调用回调函数
    // 比如[3, empty, 5]，k=1时，in O为false，所以不会调用回调函数, k=0 时，in O为true，所以会调用回调函数
    if (k in O) {
      // 使用call方法调用回调函数，以便可以指定this值
      // 传递三个参数：当前元素、索引和原数组，这与原生map方法的参数一致
      // 将回调函数的返回值存储到新数组的对应位置
      A[k] = callback.call(thisArg, O[k], k, O);
    }
  }

  // 返回包含所有映射结果的新数组
  return A;
};

/**
 * 模拟实现数组的filter方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.7
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 检查callback是否为函数，否则抛出TypeError
 * 5. 创建新的空数组A
 * 6. 遍历数组每个索引，对存在的元素调用callback
 * 7. 如果callback返回真值，则将当前元素添加到新数组
 * 8. 返回新数组
 *
 * @param callback 谓词函数，接收三个参数：当前元素、索引和原数组
 * @param thisArg 可选参数，执行callback时的this值
 * @returns 返回一个新数组，包含所有callback返回值为真的元素
 */
(<any>Array.prototype).myFilter = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  const A = [];
  for (let k = 0; k < len; k++) {
    if (k in O && callback.call(thisArg, O[k], k, O)) {
      A.push(O[k]);
    }
  }
  return A;
};

/**
 * 模拟实现数组的reduce方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.21
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 检查callback是否为函数，否则抛出TypeError
 * 5. 如果数组为空且没有提供initialValue，抛出TypeError
 * 6. 如果提供了initialValue，将其作为初始累加器值；否则使用数组第一个存在的元素
 * 7. 从适当的索引开始遍历数组，对每个存在的元素调用callback
 * 8. 返回最终的累加结果
 *
 * @param callback 归约函数，接收四个参数：累加器、当前元素、当前索引和原数组
 * @param initialValue 可选参数，作为归约的初始值
 * @returns 返回最终的归约结果
 */
(<any>Array.prototype).myReduce = function (callback, initialValue) {
  // 检查this是否为null或undefined
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }

  // 检查callback是否为函数
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // 将this转换为对象
  const O = Object(this);

  // 获取数组长度并转换为无符号32位整数
  const len = O.length >>> 0;

  // 初始化索引和累加器
  let k = 0;
  let accumulator = initialValue;

  // 如果没有提供初始值
  if (accumulator === undefined) {
    // 找到数组中第一个存在的元素
    while (k < len && !(k in O)) {
      k++;
    }

    // 如果数组为空或所有元素都不存在，抛出错误
    if (k >= len) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    // 使用找到的第一个元素作为累加器的初始值，并将索引加1
    accumulator = O[k++];
  }

  // 从当前索引开始遍历数组
  while (k < len) {
    // 只处理数组中存在的元素
    if (k in O) {
      // 调用回调函数，更新累加器的值
      // 注意这里thisArg被设为undefined，符合原生reduce的行为
      accumulator = callback.call(undefined, accumulator, O[k], k, O);
    }
    k++;
  }

  // 返回最终的累加结果
  return accumulator;
};

// 使用示例
// const arr = [1, 2, 3, 4];
// const mapped = arr.myMap(item => item * 2);
// console.log(mapped); // [2, 4, 6, 8]
