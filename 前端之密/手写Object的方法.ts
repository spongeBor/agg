export default {};
/**
 * 手写 Object.create 方法
 * 创建一个新对象，使用现有对象作为新创建对象的原型
 * @param proto 新创建对象的原型对象
 * @param propertiesObject 可选参数，包含属性描述符的对象
 * @returns 创建的新对象
 */
function myObjectCreate(
  proto: object | null,
  propertiesObject?: PropertyDescriptorMap
): object {
  if (typeof proto !== "object" && proto !== null) {
    throw new TypeError("Object prototype may only be an Object or null");
  }

  const obj = {};
  Object.setPrototypeOf(obj, proto);

  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }

  return obj;
}

/**
 * 手写 Object.assign 方法
 * 将所有可枚举属性的值从一个或多个源对象复制到目标对象，并返回目标对象
 * @param target 目标对象，将被修改并返回
 * @param sources 源对象，其属性将被复制到目标对象
 * @returns 修改后的目标对象
 */
function myObjectAssign<T extends object, U>(
  target: T,
  ...sources: U[]
): T & U {
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const result = Object(target);

  sources.forEach((source) => {
    if (source !== null && source !== undefined) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          result[key] = source[key];
        }
      }
    }
  });

  return result as T & U;
}

/**
 * 手写 Object.keys 方法
 * 返回一个包含对象自身可枚举属性名称的数组
 * @param obj 要获取键的对象
 * @returns 包含对象自身可枚举属性名的数组
 */
function myObjectKeys(obj: object): string[] {
  if (obj === null || obj === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const result: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(key);
    }
  }

  return result;
}

/**
 * 手写 Object.values 方法
 * 返回一个包含对象自身可枚举属性值的数组
 * @param obj 要获取值的对象
 * @returns 包含对象自身可枚举属性值的数组
 */
function myObjectValues<T>(obj: { [s: string]: T } | ArrayLike<T>): T[] {
  if (obj === null || obj === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const result: T[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(obj[key]);
    }
  }

  return result;
}

/**
 * 手写 Object.entries 方法
 * 返回一个包含对象自身可枚举属性的 [key, value] 键值对数组
 * @param obj 要获取键值对的对象
 * @returns 包含 [key, value] 键值对的数组
 */
function myObjectEntries<T>(
  obj: { [s: string]: T } | ArrayLike<T>
): [string, T][] {
  if (obj === null || obj === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const result: [string, T][] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push([key, obj[key]]);
    }
  }

  return result;
}

/**
 * 手写 Object.fromEntries 方法
 * 将键值对列表转换为一个对象
 * @param entries 键值对数组或可迭代对象
 * @returns 由键值对创建的对象
 */
function myObjectFromEntries<T>(entries: Iterable<readonly [PropertyKey, T]>): {
  [k: string]: T;
} {
  const result: { [k: string]: T } = {};

  for (const [key, value] of entries) {
    result[key as string] = value;
  }

  return result;
}

/**
 * 手写 Object.is 方法
 * 判断两个值是否相同，处理特殊情况如 +0 与 -0 不相等以及 NaN 等于自身
 * @param value1 要比较的第一个值
 * @param value2 要比较的第二个值
 * @returns 两个值是否相同
 */
function myObjectIs(value1: any, value2: any): boolean {
  // 处理 +0 和 -0
  if (value1 === 0 && value2 === 0) {
    return 1 / value1 === 1 / value2;
  }

  // 处理 NaN
  if (value1 !== value1) {
    return value2 !== value2;
  }

  // 其他情况
  return value1 === value2;
}

/**
 * 手写 Object.freeze 方法
 * 冻结一个对象，被冻结后的对象不能添加新属性、删除已有属性、修改已有属性的值和可配置性
 * @param obj 要冻结的对象
 * @returns 被冻结的对象
 */
function myObjectFreeze<T>(obj: T): Readonly<T> {
  if (obj === null || obj === undefined) {
    throw new TypeError("Cannot freeze undefined or null");
  }

  const props = Object.getOwnPropertyNames(obj);

  for (const prop of props) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, prop);

    if (descriptor && descriptor.configurable) {
      Object.defineProperty(obj, prop, {
        configurable: false,
        writable: false,
      });
    }
  }

  // 防止添加新属性
  Object.preventExtensions(obj);

  return obj;
}

/**
 * 手写 Object.seal 方法
 * 密封一个对象，密封后不能添加新属性，也不能重新配置或删除现有属性
 * @param obj 要密封的对象
 * @returns 被密封的对象
 */
function myObjectSeal<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    throw new TypeError("Cannot seal undefined or null");
  }

  const props = Object.getOwnPropertyNames(obj);

  for (const prop of props) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, prop);

    if (descriptor && descriptor.configurable) {
      Object.defineProperty(obj, prop, {
        configurable: false,
      });
    }
  }

  // 防止添加新属性
  Object.preventExtensions(obj);

  return obj;
}

// 导出所有方法
export {
  myObjectCreate,
  myObjectAssign,
  myObjectKeys,
  myObjectValues,
  myObjectEntries,
  myObjectFromEntries,
  myObjectIs,
  myObjectFreeze,
  myObjectSeal,
};
