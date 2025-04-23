export default {};
/**
 * 插入排序
 * 时间复杂度: O(n²)
 * 空间复杂度: O(1)
 * 稳定性: 稳定
 */

/**
 * 插入排序算法实现 - 写法1: j = i - 1
 * 在这种写法中，j指向已排序部分的最后一个元素
 * @param arr 要排序的数组
 * @returns 排序后的数组
 */
export function insertionSort<T>(arr: T[]): T[] {
  const len = arr.length;
  if (len <= 1) return arr;

  // 逐个将未排序部分的元素插入到已排序部分
  for (let i = 1; i < len; i++) {
    // 当前要插入的元素
    const current = arr[i];
    // 从已排序部分从后往前查找插入位置
    let j = i - 1;

    // 查找插入位置的同时完成元素后移
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j]; // 元素后移
      j--;
    }

    // 插入元素到正确位置
    arr[j + 1] = current;
  }

  return arr;
}

/**
 * 插入排序算法的另一种实现 - 写法2: j = i
 * 在这种写法中，j指向当前处理的位置
 * @param arr 要排序的数组
 * @returns 排序后的数组
 */
export function insertionSortAlternative<T>(arr: T[]): T[] {
  const len = arr.length;
  if (len <= 1) return arr;

  // 逐个将未排序部分的元素插入到已排序部分
  for (let i = 1; i < len; i++) {
    // 当前要插入的元素
    const current = arr[i];
    // j从当前位置开始
    let j = i;

    // 查找插入位置的同时完成元素后移
    while (j > 0 && arr[j - 1] > current) {
      arr[j] = arr[j - 1]; // 元素后移
      j--;
    }

    // 插入元素到正确位置
    arr[j] = current;
  }

  return arr;
}

/**
 * 两种插入排序写法的主要区别：
 *
 * 1. 写法1 (j = i - 1):
 *    - j指向"已排序部分的最后一个元素"
 *    - 循环条件为 j >= 0 && arr[j] > current
 *    - 移动操作为 arr[j + 1] = arr[j]
 *    - 最终插入为 arr[j + 1] = current
 *
 * 2. 写法2 (j = i):
 *    - j指向"当前处理的位置"
 *    - 循环条件为 j > 0 && arr[j - 1] > current
 *    - 移动操作为 arr[j] = arr[j - 1]
 *    - 最终插入为 arr[j] = current
 *
 * 两种写法在算法效率和功能上完全相同，只是表达方式和索引参照点不同。
 * 写法2可能更直观，因为j始终表示"当前要插入的位置"。
 */

// 测试用例
function runTests(): void {
  // 测试1: 随机数组
  const randomArr = [64, 34, 25, 12, 22, 11, 90];
  const sortedRandomArr = insertionSort([...randomArr]);
  console.log("原始数组:", randomArr);
  console.log("排序后:", sortedRandomArr);
  console.assert(
    JSON.stringify(sortedRandomArr) ===
      JSON.stringify([11, 12, 22, 25, 34, 64, 90]),
    "随机数组排序失败"
  );

  // 测试2: 已排序数组
  const sortedArr = [1, 2, 3, 4, 5];
  const sortedResult = insertionSort([...sortedArr]);
  console.log("原始数组:", sortedArr);
  console.log("排序后:", sortedResult);
  console.assert(
    JSON.stringify(sortedResult) === JSON.stringify([1, 2, 3, 4, 5]),
    "已排序数组测试失败"
  );

  // 测试3: 逆序数组
  const reversedArr = [5, 4, 3, 2, 1];
  const sortedReversedArr = insertionSort([...reversedArr]);
  console.log("原始数组:", reversedArr);
  console.log("排序后:", sortedReversedArr);
  console.assert(
    JSON.stringify(sortedReversedArr) === JSON.stringify([1, 2, 3, 4, 5]),
    "逆序数组排序失败"
  );

  // 测试4: 重复元素
  const duplicateArr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
  const sortedDuplicateArr = insertionSort([...duplicateArr]);
  console.log("原始数组:", duplicateArr);
  console.log("排序后:", sortedDuplicateArr);
  console.assert(
    JSON.stringify(sortedDuplicateArr) ===
      JSON.stringify([1, 1, 2, 3, 4, 5, 5, 6, 9]),
    "重复元素数组排序失败"
  );

  // 测试5: 空数组
  const emptyArr: number[] = [];
  const sortedEmptyArr = insertionSort([...emptyArr]);
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
