export default {};
/**
 * 桶排序
 * 时间复杂度: 平均 O(n + k)，最坏 O(n²)，其中k是桶的数量
 * 空间复杂度: O(n + k)
 * 稳定性: 取决于桶内排序的稳定性
 */

/**
 * 桶排序算法实现
 * 注意：桶排序通常用于均匀分布的数据
 * @param arr 要排序的数组
 * @param bucketSize 桶的大小
 * @returns 排序后的数组
 */
export function bucketSort(arr: number[], bucketSize = 5): number[] {
  // TODO: 实现桶排序算法
  return arr;
}

// 测试用例
function runTests(): void {
  // 测试1: 随机数组
  const randomArr = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51];
  const sortedRandomArr = bucketSort([...randomArr]);
  console.log("原始数组:", randomArr);
  console.log("排序后:", sortedRandomArr);
  console.assert(
    JSON.stringify(sortedRandomArr) ===
      JSON.stringify([0.23, 0.25, 0.32, 0.42, 0.47, 0.51, 0.52]),
    "随机数组排序失败"
  );

  // 测试2: 均匀分布的数组
  const uniformArr = [
    0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68,
  ];
  const sortedUniformArr = bucketSort([...uniformArr]);
  console.log("原始数组:", uniformArr);
  console.log("排序后:", sortedUniformArr);
  console.assert(
    JSON.stringify(sortedUniformArr) ===
      JSON.stringify([
        0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94,
      ]),
    "均匀分布数组排序失败"
  );

  // 测试3: 已排序数组
  const sortedArr = [0.1, 0.2, 0.3, 0.4, 0.5];
  const sortedResult = bucketSort([...sortedArr]);
  console.log("原始数组:", sortedArr);
  console.log("排序后:", sortedResult);
  console.assert(
    JSON.stringify(sortedResult) === JSON.stringify([0.1, 0.2, 0.3, 0.4, 0.5]),
    "已排序数组测试失败"
  );

  // 测试4: 逆序数组
  const reversedArr = [0.9, 0.8, 0.7, 0.6, 0.5];
  const sortedReversedArr = bucketSort([...reversedArr]);
  console.log("原始数组:", reversedArr);
  console.log("排序后:", sortedReversedArr);
  console.assert(
    JSON.stringify(sortedReversedArr) ===
      JSON.stringify([0.5, 0.6, 0.7, 0.8, 0.9]),
    "逆序数组排序失败"
  );

  // 测试5: 空数组
  const emptyArr: number[] = [];
  const sortedEmptyArr = bucketSort([...emptyArr]);
  console.log("原始数组:", emptyArr);
  console.log("排序后:", sortedEmptyArr);
  console.assert(
    JSON.stringify(sortedEmptyArr) === JSON.stringify([]),
    "空数组排序失败"
  );

  // 测试6: 整数数组
  const integerArr = [22, 45, 12, 8, 10, 6, 72, 81, 33, 18, 50, 14];
  const sortedIntegerArr = bucketSort([...integerArr], 10);
  console.log("原始数组:", integerArr);
  console.log("排序后:", sortedIntegerArr);
  console.assert(
    JSON.stringify(sortedIntegerArr) ===
      JSON.stringify([6, 8, 10, 12, 14, 18, 22, 33, 45, 50, 72, 81]),
    "整数数组排序失败"
  );

  console.log("所有测试通过！");
}

// 直接运行测试
runTests();
