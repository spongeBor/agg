/**
 * 快速排序
 * 时间复杂度: 平均 O(n log n)，最坏 O(n²)
 * 空间复杂度: O(log n)
 * 稳定性: 不稳定
 */

/**
 * 快速排序算法实现
 * @param arr 要排序的数组
 * @returns 排序后的数组
 */
export function quickSort<T>(arr: T[]): T[] {
  // 边界条件：数组长度小于等于1时直接返回
  if (arr.length <= 1) return arr;

  // 复制数组以避免修改原数组
  const result = [...arr];

  /**
   * 快速排序的核心分区函数
   * 选择一个基准元素，将数组分为两部分：
   * - 左侧部分：所有元素都小于或等于基准
   * - 右侧部分：所有元素都大于基准
   * @param arr 要分区的数组
   * @param low 分区的起始索引
   * @param high 分区的结束索引
   * @returns 基准元素的最终位置
   */
  const partition = (arr: T[], low: number, high: number): number => {
    // 选择基准元素（这里选择中间元素以避免已排序数组的最坏情况）
    const pivotIndex = Math.floor((low + high) / 2);
    const pivot = arr[pivotIndex];

    // 将基准元素移到末尾
    [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];

    // 存储小于基准的元素应放置的位置
    let i = low;

    // 遍历区间，将小于基准的元素放到左侧
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        // 交换元素，将小于基准的元素放到左侧
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }

    // 将基准元素放到最终位置
    [arr[i], arr[high]] = [arr[high], arr[i]];

    // 返回基准元素的最终位置
    return i;
  };

  /**
   * 快速排序的递归实现
   * @param arr 要排序的数组
   * @param low 排序区间的起始索引
   * @param high 排序区间的结束索引
   */
  const quickSortRecursive = (arr: T[], low: number, high: number): void => {
    // 递归终止条件：区间长度小于等于1
    if (low >= high) return;

    // 获取分区点
    const pivotIndex = partition(arr, low, high);

    // 递归排序左侧分区
    quickSortRecursive(arr, low, pivotIndex - 1);

    // 递归排序右侧分区
    quickSortRecursive(arr, pivotIndex + 1, high);
  };

  // 调用递归函数进行排序
  quickSortRecursive(result, 0, result.length - 1);

  return result;
}

// 测试用例
function runTests(): void {
  // 测试1: 随机数组
  const randomArr = [64, 34, 25, 12, 22, 11, 90];
  const sortedRandomArr = quickSort([...randomArr]);
  console.log("原始数组:", randomArr);
  console.log("排序后:", sortedRandomArr);
  console.assert(
    JSON.stringify(sortedRandomArr) ===
      JSON.stringify([11, 12, 22, 25, 34, 64, 90]),
    "随机数组排序失败"
  );

  // 测试2: 已排序数组
  const sortedArr = [1, 2, 3, 4, 5];
  const sortedResult = quickSort([...sortedArr]);
  console.log("原始数组:", sortedArr);
  console.log("排序后:", sortedResult);
  console.assert(
    JSON.stringify(sortedResult) === JSON.stringify([1, 2, 3, 4, 5]),
    "已排序数组测试失败"
  );

  // 测试3: 逆序数组
  const reversedArr = [5, 4, 3, 2, 1];
  const sortedReversedArr = quickSort([...reversedArr]);
  console.log("原始数组:", reversedArr);
  console.log("排序后:", sortedReversedArr);
  console.assert(
    JSON.stringify(sortedReversedArr) === JSON.stringify([1, 2, 3, 4, 5]),
    "逆序数组排序失败"
  );

  // 测试4: 重复元素
  const duplicateArr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
  const sortedDuplicateArr = quickSort([...duplicateArr]);
  console.log("原始数组:", duplicateArr);
  console.log("排序后:", sortedDuplicateArr);
  console.assert(
    JSON.stringify(sortedDuplicateArr) ===
      JSON.stringify([1, 1, 2, 3, 4, 5, 5, 6, 9]),
    "重复元素数组排序失败"
  );

  // 测试5: 空数组
  const emptyArr: number[] = [];
  const sortedEmptyArr = quickSort([...emptyArr]);
  console.log("原始数组:", emptyArr);
  console.log("排序后:", sortedEmptyArr);
  console.assert(
    JSON.stringify(sortedEmptyArr) === JSON.stringify([]),
    "空数组排序失败"
  );

  console.log("所有测试通过！");
}

// 直接运行测试
runTests();
