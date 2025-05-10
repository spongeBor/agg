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
(<any>Array.prototype).myMap = function <T, U>(
  callback: (value: T, index: number, array: T[]) => U,
  thisArg?: any
): U[] {
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
 * 模拟实现数组的forEach方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.12
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 检查callback是否为函数，否则抛出TypeError
 * 5. 遍历数组每个索引，对存在的元素调用callback
 * 6. 返回undefined（forEach不返回任何值）
 *
 * @param callback 回调函数，接收三个参数：当前元素、索引和原数组
 * @param thisArg 可选参数，执行callback时的this值
 * @returns undefined
 */
(<any>Array.prototype).myForEach = function <T>(
  callback: (value: T, index: number, array: T[]) => void,
  thisArg?: any
): void {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  for (let k = 0; k < len; k++) {
    if (k in O) {
      callback.call(thisArg, O[k], k, O);
    }
  }
  return undefined;
};

/**
 * 模拟实现数组的some方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.24
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 检查callback是否为函数，否则抛出TypeError
 * 5. 遍历数组每个索引，对存在的元素调用callback
 * 6. 如果callback返回真值，立即返回true
 * 7. 如果循环结束仍未找到真值，返回false
 *
 * @param callback 谓词函数，接收三个参数：当前元素、索引和原数组
 * @param thisArg 可选参数，执行callback时的this值
 * @returns 如果callback对任一元素返回真值则返回true，否则返回false
 */
(<any>Array.prototype).mySome = function <T>(
  callback: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): boolean {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  for (let k = 0; k < len; k++) {
    if (k in O && callback.call(thisArg, O[k], k, O)) {
      return true;
    }
  }
  return false;
};

/**
 * 模拟实现数组的every方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.5
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 检查callback是否为函数，否则抛出TypeError
 * 5. 遍历数组每个索引，对存在的元素调用callback
 * 6. 如果callback返回假值，立即返回false
 * 7. 如果循环结束且所有调用都返回真值，返回true
 *
 * @param callback 谓词函数，接收三个参数：当前元素、索引和原数组
 * @param thisArg 可选参数，执行callback时的this值
 * @returns 如果callback对所有元素都返回真值则返回true，否则返回false
 */
(<any>Array.prototype).myEvery = function <T>(
  callback: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): boolean {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  for (let k = 0; k < len; k++) {
    if (k in O && !callback.call(thisArg, O[k], k, O)) {
      return false;
    }
  }
  return true;
};

/**
 * 模拟实现数组的find方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.8
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 检查callback是否为函数，否则抛出TypeError
 * 5. 遍历数组每个索引，对存在的元素调用callback
 * 6. 如果callback返回真值，立即返回当前元素
 * 7. 如果循环结束仍未找到匹配元素，返回undefined
 *
 * @param callback 谓词函数，接收三个参数：当前元素、索引和原数组
 * @param thisArg 可选参数，执行callback时的this值
 * @returns 返回第一个满足条件的元素，如果没有则返回undefined
 */
(<any>Array.prototype).myFind = function <T>(
  callback: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): T | undefined {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  for (let k = 0; k < len; k++) {
    if (k in O && callback.call(thisArg, O[k], k, O)) {
      return O[k];
    }
  }
  return undefined;
};

/**
 * 模拟实现数组的findIndex方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.9
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 检查callback是否为函数，否则抛出TypeError
 * 5. 遍历数组每个索引，对存在的元素调用callback
 * 6. 如果callback返回真值，立即返回当前索引
 * 7. 如果循环结束仍未找到匹配元素，返回-1
 *
 * @param callback 谓词函数，接收三个参数：当前元素、索引和原数组
 * @param thisArg 可选参数，执行callback时的this值
 * @returns 返回第一个满足条件的元素的索引，如果没有则返回-1
 */
(<any>Array.prototype).myFindIndex = function <T>(
  callback: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): number {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  for (let k = 0; k < len; k++) {
    if (k in O && callback.call(thisArg, O[k], k, O)) {
      return k;
    }
  }
  return -1;
};

/**
 * 模拟实现数组的includes方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.13
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 如果数组长度为0，返回false
 * 5. 确定搜索的起始索引，默认为0
 * 6. 如果fromIndex为负，从数组末尾计算起始位置
 * 7. 遍历数组，对每个元素进行严格相等比较或检查NaN
 * 8. 如果找到匹配元素，返回true，否则返回false
 *
 * @param searchElement 要搜索的元素
 * @param fromIndex 开始搜索的索引，默认为0
 * @returns 如果找到指定元素则返回true，否则返回false
 */
(<any>Array.prototype).myIncludes = function <T>(
  searchElement: T,
  fromIndex: number = 0
): boolean {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  for (let k = fromIndex; k < len; k++) {
    if (k in O && O[k] === searchElement) {
      return true;
    }
  }
  return false;
};

/**
 * 模拟实现数组的indexOf方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.14
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 如果数组长度为0，返回-1
 * 5. 确定搜索的起始索引，默认为0
 * 6. 如果fromIndex为负，从数组末尾计算起始位置
 * 7. 遍历数组，对每个元素进行严格相等比较
 * 8. 如果找到匹配元素，返回其索引，否则返回-1
 *
 * @param searchElement 要搜索的元素
 * @param fromIndex 开始搜索的索引，默认为0
 * @returns 返回指定元素在数组中的第一个索引，如果不存在则返回-1
 */
(<any>Array.prototype).myIndexOf = function <T>(
  searchElement: T,
  fromIndex: number = 0
): number {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  for (let k = fromIndex; k < len; k++) {
    if (k in O && O[k] === searchElement) {
      return k;
    }
  }
  return -1;
};

/**
 * 模拟实现数组的fill方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.6
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 处理起始索引start，默认为0
 * 5. 处理结束索引end，默认为数组长度
 * 6. 如果索引为负，从数组末尾计算实际位置
 * 7. 遍历指定区间内的每个索引，设置元素为value
 * 8. 返回修改后的数组对象
 *
 * @param value 用来填充数组的值
 * @param start 开始索引，默认为0
 * @param end 结束索引（不包含），默认为数组长度
 * @returns 返回修改后的数组
 */
(<any>Array.prototype).myFill = function (
  value: any,
  start: number = 0,
  end: number = this.length
) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  const O = Object(this);
  const len = O.length >>> 0;

  // 处理start参数
  let relativeStart = start;
  // 如果start为负数，则从数组末尾计算起始位置
  if (relativeStart < 0) {
    relativeStart = Math.max(len + relativeStart, 0);
  } else {
    relativeStart = Math.min(relativeStart, len);
  }

  // 处理end参数
  let relativeEnd = end;
  // 如果end为负数，则从数组末尾计算结束位置
  if (relativeEnd < 0) {
    relativeEnd = Math.max(len + relativeEnd, 0);
  } else {
    relativeEnd = Math.min(relativeEnd, len);
  }

  // 填充数组
  for (let k = relativeStart; k < relativeEnd; k++) {
    O[k] = value;
  }

  return O;
};

/**
 * 模拟实现数组的flat方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.10
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 处理深度参数depth，默认为1
 * 5. 创建新的空数组result
 * 6. 遍历原数组，对于每个元素：
 *    a. 如果是数组且depth>0，递归调用flat(depth-1)并将结果添加到新数组
 *    b. 如果是数组且depth=0或不是数组，直接添加到新数组
 * 7. 返回新的扁平化数组
 *
 * @param depth 指定嵌套数组的结构深度，默认为1
 * @returns 返回一个新数组，其中所有子数组元素都被递归地展开
 */
(<any>Array.prototype).myFlat = function (depth: number = 1) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  const result: any[] = [];

  // 确保depth是整数
  const depthNum = Math.floor(Number(depth));

  for (let k = 0; k < len; k++) {
    if (k in O) {
      if (Array.isArray(O[k]) && depthNum > 0) {
        // 只有当depth > 0时才展开数组
        result.push(...O[k].myFlat(depthNum - 1));
      } else {
        // 当depth = 0或元素不是数组时，直接添加元素
        result.push(O[k]);
      }
    }
  }
  return result;
};

/**
 * 模拟实现数组的slice方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.23
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 处理起始索引start，如果为负则从数组末尾计算
 * 5. 处理结束索引end，如果为负则从数组末尾计算，如果未提供则使用数组长度
 * 6. start和end都要确保在有效范围内（0到length之间）
 * 7. 如果计算后的end小于等于start，返回空数组
 * 8. 创建新数组，将指定范围内的元素复制到新数组
 * 9. 返回新数组
 *
 * @param start 提取起始处的索引，默认为0
 * @param end 提取终止处的索引（不包含），默认为数组长度
 * @returns 返回一个新数组，包含提取的元素
 */
(<any>Array.prototype).mySlice = function <T, U>(
  start: number = 0,
  end: number = this.length
) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  const O = Object(this);
  const len = O.length >>> 0;

  // 处理负数索引
  let relativeStart = start;
  let relativeEnd = end;

  if (relativeStart < 0) {
    relativeStart = Math.max(len + relativeStart, 0);
  } else {
    relativeStart = Math.min(relativeStart, len);
  }

  if (relativeEnd < 0) {
    relativeEnd = Math.max(len + relativeEnd, 0);
  } else {
    relativeEnd = Math.min(relativeEnd, len);
  }

  const result: any[] = [];

  // 当end小于start时，返回空数组
  if (relativeEnd <= relativeStart) {
    return result;
  }

  for (let k = relativeStart; k < relativeEnd; k++) {
    if (k in O) {
      result.push(O[k]);
    }
  }

  return result;
};

/**
 * 模拟实现数组的splice方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.27
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 处理起始索引start，如果为负则从末尾计算
 * 5. 处理删除计数deleteCount，确保在有效范围内
 * 6. 创建新数组保存被删除的元素
 * 7. 计算需要移动的元素数量并进行移动
 * 8. 在指定位置插入新元素
 * 9. 更新数组长度
 * 10. 返回包含被删除元素的数组
 *
 * @param start 指定修改的开始位置
 * @param deleteCount 表示要移除的数组元素的个数
 * @param items 要添加进数组的元素，从start位置开始
 * @returns 返回由被删除元素组成的数组
 */
(<any>Array.prototype).mySplice = function (
  start: number,
  deleteCount?: number,
  ...items: any[]
) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  const O = Object(this);
  const len = O.length >>> 0;

  // 处理起始位置
  let actualStart = start;
  if (actualStart < 0) {
    actualStart = Math.max(len + actualStart, 0);
  } else {
    actualStart = Math.min(actualStart, len);
  }

  // 处理删除数量
  let actualDeleteCount = len - actualStart;
  if (deleteCount !== undefined) {
    actualDeleteCount = Math.min(Math.max(0, deleteCount), len - actualStart);
  }

  // 创建包含被删除元素的数组
  const deletedElements = [];
  for (let i = 0; i < actualDeleteCount; i++) {
    const from = actualStart + i;
    if (from in O) {
      deletedElements[i] = O[from];
    }
  }

  // 计算需要移动的元素数量
  const itemCount = items.length;
  const shiftCount = itemCount - actualDeleteCount;

  // 如果插入的元素比删除的元素多，需要从后向前移动元素
  if (shiftCount > 0) {
    for (let i = len - 1; i >= actualStart + actualDeleteCount; i--) {
      const to = i + shiftCount;
      if (i in O) {
        O[to] = O[i];
      } else {
        delete O[to];
      }
    }
  }
  // 如果插入的元素比删除的元素少，需要从前向后移动元素
  else if (shiftCount < 0) {
    for (let i = actualStart + actualDeleteCount; i < len; i++) {
      const to = i + shiftCount;
      if (i in O) {
        O[to] = O[i];
      } else {
        delete O[to];
      }
    }
    // 删除多余的元素
    for (let i = len - 1; i >= len + shiftCount; i--) {
      delete O[i];
    }
  }

  // 插入新元素
  for (let i = 0; i < itemCount; i++) {
    O[actualStart + i] = items[i];
  }

  // 更新数组长度
  O.length = len + shiftCount;

  return deletedElements;
};

/**
 * 模拟实现数组的join方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.15
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 如果未提供分隔符，使用逗号作为默认值
 * 5. 如果数组长度为0，返回空字符串
 * 6. 将第一个元素转换为字符串（如果undefined或null则转为空字符串）
 * 7. 遍历剩余元素，将分隔符与元素字符串拼接到结果中
 * 8. 返回最终拼接的字符串
 *
 * @param separator 指定用于分隔数组元素的字符串，默认为逗号(',')
 * @returns 返回所有数组元素连接的字符串
 */
(<any>Array.prototype).myJoin = function <T>(separator: string = ","): string {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0;
  let result = "";

  if (len === 0) {
    return result;
  }

  if (k in O) {
    // 等效于 result += O[k] === null || O[k] === undefined ? "" : O[k];
    result += O[k] ?? "";
  }
  k++;

  while (k < len) {
    result += separator;
    if (k in O) {
      // 等效于 result += O[k] === null || O[k] === undefined ? "" : O[k];
      result += O[k] ?? "";
    }
    k++;
  }

  return result;
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
(<any>Array.prototype).myFilter = function <T>(
  callback: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): T[] {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  const A: T[] = [];
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
(<any>Array.prototype).myReduce = function <T, U>(
  callback: (
    accumulator: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  initialValue?: U
): U {
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
  let accumulator: any = initialValue;

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

/**
 * 模拟实现数组的reduceRight方法
 *
 * 规范来源: ECMAScript 262 规范 22.1.3.22
 *
 * 规范步骤:
 * 1. 如果this值为null或undefined，抛出TypeError异常
 * 2. 将this值转换为Object
 * 3. 获取对象的length属性并转换为无符号32位整数
 * 4. 检查callback是否为函数，否则抛出TypeError
 * 5. 如果数组为空且没有提供initialValue，抛出TypeError
 * 6. 如果提供了initialValue，将其作为初始累加器值；否则使用数组最后一个存在的元素
 * 7. 从数组末尾开始向前遍历，对每个存在的元素调用callback
 * 8. 返回最终的累加结果
 *
 * @param callback 归约函数，接收四个参数：累加器、当前元素、当前索引和原数组
 * @param initialValue 可选参数，作为归约的初始值
 * @returns 返回最终的归约结果
 */
(<any>Array.prototype).myReduceRight = function <T, U>(
  callback: (
    accumulator: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  initialValue?: U
): U {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = len - 1;
  let accumulator: any = initialValue;
  if (accumulator === undefined) {
    while (k >= 0 && !(k in O)) {
      k--;
    }
    if (k < 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = O[k--];
  }
  while (k >= 0) {
    if (k in O) {
      accumulator = callback.call(undefined, accumulator, O[k], k, O);
    }
    k--;
  }
  return accumulator;
};
