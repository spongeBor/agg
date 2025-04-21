/**
 * 冒泡排序
 * 时间复杂度: O(n²)
 * 空间复杂度: O(1)
 * 稳定性: 稳定
 */

/**
 * 冒泡排序算法实现
 * @param arr 要排序的数组
 * @returns 排序后的数组
 */
export function bubbleSort<T>(arr: T[]): T[] {
  // TODO: 实现冒泡排序算法
  return arr;
}

// 测试用例
function runTests(): void {
  // 测试1: 随机数组
  const randomArr = [64, 34, 25, 12, 22, 11, 90];
  console.log("原始数组:", randomArr);
  console.log("排序后:", bubbleSort([...randomArr]));

  // 测试2: 已排序数组
  const sortedArr = [1, 2, 3, 4, 5];
  console.log("原始数组:", sortedArr);
  console.log("排序后:", bubbleSort([...sortedArr]));

  // 测试3: 逆序数组
  const reversedArr = [5, 4, 3, 2, 1];
  console.log("原始数组:", reversedArr);
  console.log("排序后:", bubbleSort([...reversedArr]));

  // 测试4: 重复元素
  const duplicateArr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
  console.log("原始数组:", duplicateArr);
  console.log("排序后:", bubbleSort([...duplicateArr]));

  // 测试5: 空数组
  const emptyArr: number[] = [];
  console.log("原始数组:", emptyArr);
  console.log("排序后:", bubbleSort([...emptyArr]));
}

// 直接运行测试
runTests();
