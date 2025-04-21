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
  console.log("原始数组:", randomArr);
  console.log("排序后:", bucketSort([...randomArr]));

  // 测试2: 均匀分布的数组
  const uniformArr = [
    0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68,
  ];
  console.log("原始数组:", uniformArr);
  console.log("排序后:", bucketSort([...uniformArr]));

  // 测试3: 已排序数组
  const sortedArr = [0.1, 0.2, 0.3, 0.4, 0.5];
  console.log("原始数组:", sortedArr);
  console.log("排序后:", bucketSort([...sortedArr]));

  // 测试4: 逆序数组
  const reversedArr = [0.9, 0.8, 0.7, 0.6, 0.5];
  console.log("原始数组:", reversedArr);
  console.log("排序后:", bucketSort([...reversedArr]));

  // 测试5: 空数组
  const emptyArr: number[] = [];
  console.log("原始数组:", emptyArr);
  console.log("排序后:", bucketSort([...emptyArr]));

  // 测试6: 整数数组
  const integerArr = [22, 45, 12, 8, 10, 6, 72, 81, 33, 18, 50, 14];
  console.log("原始数组:", integerArr);
  console.log("排序后:", bucketSort([...integerArr], 10));
}

// 直接运行测试
runTests();
