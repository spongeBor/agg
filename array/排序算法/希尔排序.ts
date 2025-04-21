/**
 * 希尔排序
 * 时间复杂度: O(n log n) ~ O(n²)，取决于间隔序列
 * 空间复杂度: O(1)
 * 稳定性: 不稳定
 */

/**
 * 希尔排序算法实现
 * @param arr 要排序的数组
 * @returns 排序后的数组
 */
export function shellSort<T>(arr: T[]): T[] {
  // 获取数组长度
  const len = arr.length;
  // 边界条件处理：数组长度小于等于1时直接返回
  if (len <= 1) return arr;

  // 初始化间隔(gap)值为数组长度的一半
  let gap = Math.floor(len / 2);

  // 希尔排序的核心循环：不断减小间隔值直到为0
  while (gap > 0) {
    // 对每个间隔序列执行插入排序
    // 从gap位置开始，依次处理后续元素
    for (let i = gap; i < len; i++) {
      // 暂存当前待插入元素
      const current = arr[i];
      // 初始化比较位置为当前位置向前gap距离
      let j = i - gap;

      // 在当前间隔序列中执行插入排序
      // 如果前面间隔为gap的元素比当前元素大，则后移
      while (j >= 0 && arr[j] > current) {
        // 元素后移gap位置
        arr[j + gap] = arr[j];
        // 继续向前检查前一个间隔为gap的元素
        j -= gap;
      }

      // 找到正确位置，插入当前元素
      arr[j + gap] = current;
    }

    // 缩小间隔值，进入下一轮排序
    gap = Math.floor(gap / 2);
  }

  // 返回排序完成的数组
  return arr;
}

// 测试用例
function runTests(): void {
  // 测试1: 随机数组
  const randomArr = [64, 34, 25, 12, 22, 11, 90];
  const sortedRandomArr = shellSort([...randomArr]);
  console.log("原始数组:", randomArr);
  console.log("排序后:", sortedRandomArr);
  console.assert(
    JSON.stringify(sortedRandomArr) ===
      JSON.stringify([11, 12, 22, 25, 34, 64, 90]),
    "随机数组排序失败"
  );

  // 测试2: 已排序数组
  const sortedArr = [1, 2, 3, 4, 5];
  const sortedResult = shellSort([...sortedArr]);
  console.log("原始数组:", sortedArr);
  console.log("排序后:", sortedResult);
  console.assert(
    JSON.stringify(sortedResult) === JSON.stringify([1, 2, 3, 4, 5]),
    "已排序数组测试失败"
  );

  // 测试3: 逆序数组
  const reversedArr = [5, 4, 3, 2, 1];
  const sortedReversedArr = shellSort([...reversedArr]);
  console.log("原始数组:", reversedArr);
  console.log("排序后:", sortedReversedArr);
  console.assert(
    JSON.stringify(sortedReversedArr) === JSON.stringify([1, 2, 3, 4, 5]),
    "逆序数组排序失败"
  );

  // 测试4: 重复元素
  const duplicateArr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
  const sortedDuplicateArr = shellSort([...duplicateArr]);
  console.log("原始数组:", duplicateArr);
  console.log("排序后:", sortedDuplicateArr);
  console.assert(
    JSON.stringify(sortedDuplicateArr) ===
      JSON.stringify([1, 1, 2, 3, 4, 5, 5, 6, 9]),
    "重复元素数组排序失败"
  );

  // 测试5: 空数组
  const emptyArr: number[] = [];
  const sortedEmptyArr = shellSort([...emptyArr]);
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
