export default {};
/**
 * 计数排序
 * 时间复杂度: O(n + k)，其中k是数据范围
 * 空间复杂度: O(k)
 * 稳定性: 稳定
 */

/**
 * 计数排序算法实现
 * 注意：计数排序只适用于整数排序
 * @param arr 要排序的整数数组
 * @returns 排序后的数组
 */
export function countingSort(arr: number[]): number[] {
  // TODO: 实现计数排序算法
  return arr;
}

// 测试用例
function runTests(): void {
  // 测试1: 随机数组
  const randomArr = [64, 34, 25, 12, 22, 11, 90];
  const sortedRandomArr = countingSort([...randomArr]);
  console.log("原始数组:", randomArr);
  console.log("排序后:", sortedRandomArr);
  console.assert(
    JSON.stringify(sortedRandomArr) ===
      JSON.stringify([11, 12, 22, 25, 34, 64, 90]),
    "随机数组排序失败"
  );

  // 测试2: 已排序数组
  const sortedArr = [1, 2, 3, 4, 5];
  const sortedResult = countingSort([...sortedArr]);
  console.log("原始数组:", sortedArr);
  console.log("排序后:", sortedResult);
  console.assert(
    JSON.stringify(sortedResult) === JSON.stringify([1, 2, 3, 4, 5]),
    "已排序数组测试失败"
  );

  // 测试3: 逆序数组
  const reversedArr = [5, 4, 3, 2, 1];
  const sortedReversedArr = countingSort([...reversedArr]);
  console.log("原始数组:", reversedArr);
  console.log("排序后:", sortedReversedArr);
  console.assert(
    JSON.stringify(sortedReversedArr) === JSON.stringify([1, 2, 3, 4, 5]),
    "逆序数组排序失败"
  );

  // 测试4: 重复元素
  const duplicateArr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
  const sortedDuplicateArr = countingSort([...duplicateArr]);
  console.log("原始数组:", duplicateArr);
  console.log("排序后:", sortedDuplicateArr);
  console.assert(
    JSON.stringify(sortedDuplicateArr) ===
      JSON.stringify([1, 1, 2, 3, 4, 5, 5, 6, 9]),
    "重复元素数组排序失败"
  );

  // 测试5: 空数组
  const emptyArr: number[] = [];
  const sortedEmptyArr = countingSort([...emptyArr]);
  console.log("原始数组:", emptyArr);
  console.log("排序后:", sortedEmptyArr);
  console.assert(
    JSON.stringify(sortedEmptyArr) === JSON.stringify([]),
    "空数组排序失败"
  );

  // 测试6: 包含0的数组
  const zeroArr = [5, 0, 2, 0, 1];
  const sortedZeroArr = countingSort([...zeroArr]);
  console.log("原始数组:", zeroArr);
  console.log("排序后:", sortedZeroArr);
  console.assert(
    JSON.stringify(sortedZeroArr) === JSON.stringify([0, 0, 1, 2, 5]),
    "包含0的数组排序失败"
  );

  console.log("所有测试通过！");
}

// 直接运行测试
runTests();
