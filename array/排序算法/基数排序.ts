export default {};
/**
 * 基数排序
 * 时间复杂度: O(n * k)，其中k是最大数字的位数
 * 空间复杂度: O(n + k)
 * 稳定性: 稳定
 */

/**
 * 基数排序算法实现
 * 注意：基数排序只适用于非负整数排序
 * @param arr 要排序的非负整数数组
 * @returns 排序后的数组
 */
export function radixSort(arr: number[]): number[] {
  // TODO: 实现基数排序算法
  return arr;
}

// 测试用例
function runTests(): void {
  // 测试1: 随机数组
  const randomArr = [170, 45, 75, 90, 802, 24, 2, 66];
  const sortedRandomArr = radixSort([...randomArr]);
  console.log("原始数组:", randomArr);
  console.log("排序后:", sortedRandomArr);
  console.assert(
    JSON.stringify(sortedRandomArr) ===
      JSON.stringify([2, 24, 45, 66, 75, 90, 170, 802]),
    "随机数组排序失败"
  );

  // 测试2: 已排序数组
  const sortedArr = [1, 10, 100, 1000, 10000];
  const sortedResult = radixSort([...sortedArr]);
  console.log("原始数组:", sortedArr);
  console.log("排序后:", sortedResult);
  console.assert(
    JSON.stringify(sortedResult) === JSON.stringify([1, 10, 100, 1000, 10000]),
    "已排序数组测试失败"
  );

  // 测试3: 逆序数组
  const reversedArr = [10000, 1000, 100, 10, 1];
  const sortedReversedArr = radixSort([...reversedArr]);
  console.log("原始数组:", reversedArr);
  console.log("排序后:", sortedReversedArr);
  console.assert(
    JSON.stringify(sortedReversedArr) ===
      JSON.stringify([1, 10, 100, 1000, 10000]),
    "逆序数组排序失败"
  );

  // 测试4: 重复元素
  const duplicateArr = [53, 89, 150, 36, 633, 233, 150, 89];
  const sortedDuplicateArr = radixSort([...duplicateArr]);
  console.log("原始数组:", duplicateArr);
  console.log("排序后:", sortedDuplicateArr);
  console.assert(
    JSON.stringify(sortedDuplicateArr) ===
      JSON.stringify([36, 53, 89, 89, 150, 150, 233, 633]),
    "重复元素数组排序失败"
  );

  // 测试5: 空数组
  const emptyArr: number[] = [];
  const sortedEmptyArr = radixSort([...emptyArr]);
  console.log("原始数组:", emptyArr);
  console.log("排序后:", sortedEmptyArr);
  console.assert(
    JSON.stringify(sortedEmptyArr) === JSON.stringify([]),
    "空数组排序失败"
  );

  // 测试6: 相同位数的数组
  const sameDigitsArr = [111, 222, 333, 444, 555, 666, 777, 888, 999];
  const sortedSameDigitsArr = radixSort([...sameDigitsArr]);
  console.log("原始数组:", sameDigitsArr);
  console.log("排序后:", sortedSameDigitsArr);
  console.assert(
    JSON.stringify(sortedSameDigitsArr) ===
      JSON.stringify([111, 222, 333, 444, 555, 666, 777, 888, 999]),
    "相同位数数组排序失败"
  );

  console.log("所有测试通过！");
}

// 直接运行测试
runTests();
