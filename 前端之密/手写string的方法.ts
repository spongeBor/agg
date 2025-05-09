export default {};
/**
 * 手写 JavaScript String 常用方法实现
 */

/**
 * 实现 String.prototype.trim 方法
 * @param str 输入字符串
 * @returns 去除首尾空格后的字符串
 */
function myTrim(str: string): string {
  return str.replace(/^\s+|\s+$/g, "");
}

/**
 * 实现 String.prototype.indexOf 方法
 * @param str 原始字符串
 * @param searchValue 要查找的子字符串
 * @param fromIndex 开始查找的位置，默认为0
 * @returns 子字符串第一次出现的索引，未找到则返回-1
 */
function myIndexOf(
  str: string,
  searchValue: string,
  fromIndex: number = 0
): number {
  if (fromIndex < 0) fromIndex = 0;
  if (fromIndex > str.length) return -1;
  if (searchValue === "") return fromIndex;

  for (let i = fromIndex; i <= str.length - searchValue.length; i++) {
    let match = true;
    for (let j = 0; j < searchValue.length; j++) {
      if (str[i + j] !== searchValue[j]) {
        match = false;
        break;
      }
    }
    if (match) return i;
  }
  return -1;
}

/**
 * 实现 String.prototype.substring 方法
 * @param str 原始字符串
 * @param start 起始索引
 * @param end 结束索引（不包含）
 * @returns 提取的子字符串
 */
function mySubstring(str: string, start: number, end?: number): string {
  if (start < 0) start = 0;
  if (end === undefined) end = str.length;
  if (end < 0) end = 0;
  if (start > end) [start, end] = [end, start];
  if (start > str.length) start = str.length;
  if (end > str.length) end = str.length;

  let result = "";
  for (let i = start; i < end; i++) {
    result += str[i];
  }
  return result;
}

/**
 * 实现 String.prototype.slice 方法
 * @param str 原始字符串
 * @param start 起始索引
 * @param end 结束索引（不包含）
 * @returns 提取的子字符串
 */
function mySlice(str: string, start: number, end?: number): string {
  if (end === undefined) end = str.length;

  // 处理负索引
  if (start < 0) start = str.length + start;
  if (end < 0) end = str.length + end;

  // 边界检查
  if (start < 0) start = 0;
  if (end < 0) end = 0;
  if (start > str.length) return "";
  if (end > str.length) end = str.length;
  if (start >= end) return "";

  let result = "";
  for (let i = start; i < end; i++) {
    result += str[i];
  }
  return result;
}

/**
 * 实现 String.prototype.split 方法
 * @param str 原始字符串
 * @param separator 分隔符
 * @param limit 限制结果数组的长度
 * @returns 分割后的数组
 */
function mySplit(
  str: string,
  separator?: string | RegExp,
  limit?: number
): string[] {
  if (separator === undefined) return [str];
  if (str === "") return [""];

  const result: string[] = [];

  // 简单处理字符串分隔符的情况
  if (typeof separator === "string") {
    if (separator === "") {
      // 空字符串分隔符，拆分每个字符
      for (
        let i = 0;
        i < str.length && (limit === undefined || result.length < limit);
        i++
      ) {
        result.push(str[i]);
      }
      return result;
    }

    let startIndex = 0;
    let index = str.indexOf(separator);

    while (index !== -1 && (limit === undefined || result.length < limit)) {
      result.push(str.substring(startIndex, index));
      startIndex = index + separator.length;
      index = str.indexOf(separator, startIndex);
    }

    if (limit === undefined || result.length < limit) {
      result.push(str.substring(startIndex));
    }

    return result;
  }

  // 正则表达式分隔符的简化实现
  return str.split(separator, limit);
}

/**
 * 实现 String.prototype.replace 方法（简化版本）
 * @param str 原始字符串
 * @param searchValue 要查找的字符串或正则表达式
 * @param replaceValue 替换值
 * @returns 替换后的字符串
 */
function myReplace(
  str: string,
  searchValue: string | RegExp,
  replaceValue: string
): string {
  if (typeof searchValue === "string") {
    const index = str.indexOf(searchValue);
    if (index === -1) return str;

    return (
      str.substring(0, index) +
      replaceValue +
      str.substring(index + searchValue.length)
    );
  }

  // 对于正则表达式，使用原生方法（简化实现）
  return str.replace(searchValue, replaceValue);
}

/**
 * 实现 String.prototype.padStart 方法
 * @param str 原始字符串
 * @param targetLength 目标长度
 * @param padString 填充字符串
 * @returns 填充后的字符串
 */
function myPadStart(
  str: string,
  targetLength: number,
  padString: string = " "
): string {
  if (str.length >= targetLength) return str;

  const padLength = targetLength - str.length;
  let padding = "";

  // 构建填充字符串
  while (padding.length < padLength) {
    padding += padString;
  }

  // 截取到所需长度
  padding = padding.substring(0, padLength);

  return padding + str;
}

/**
 * 实现 String.prototype.padEnd 方法
 * @param str 原始字符串
 * @param targetLength 目标长度
 * @param padString 填充字符串
 * @returns 填充后的字符串
 */
function myPadEnd(
  str: string,
  targetLength: number,
  padString: string = " "
): string {
  if (str.length >= targetLength) return str;

  const padLength = targetLength - str.length;
  let padding = "";

  // 构建填充字符串
  while (padding.length < padLength) {
    padding += padString;
  }

  // 截取到所需长度
  padding = padding.substring(0, padLength);

  return str + padding;
}

// 导出所有方法
export {
  myTrim,
  myIndexOf,
  mySubstring,
  mySlice,
  mySplit,
  myReplace,
  myPadStart,
  myPadEnd,
};
