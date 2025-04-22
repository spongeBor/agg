/**
 * 堆排序
 * 时间复杂度: O(n log n)
 * 空间复杂度: O(1)
 * 稳定性: 不稳定
 */
export function heapSortRecursive<T>(arr: T[]): T[] {
  const result = [...arr];
  const n = result.length;

  // 构建最大堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyRecursive(result, n, i);
  }

  // 一个个从堆顶取出元素（最大值）放到数组末尾
  for (let i = n - 1; i > 0; i--) {
    [result[0], result[i]] = [result[i], result[0]];
    heapifyRecursive(result, i, 0);
  }

  return result;
}
/**
 * 调整堆结构的递归实现，使其满足最大堆性质
 * @param arr 数组
 * @param n 当前堆的大小
 * @param i 需要调整的节点索引
 */
function heapifyRecursive<T>(arr: T[], n: number, i: number): void {
  // 初始化最大值为当前节点
  let largest = i;
  // 计算左子节点索引
  const left = 2 * i + 1;
  // 计算右子节点索引
  const right = 2 * i + 2;

  // 如果左子节点存在且大于当前最大值，更新最大值索引
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // 如果右子节点存在且大于当前最大值，更新最大值索引
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // 如果最大值不是当前节点，交换它们并继续调整
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    // 递归调整受影响的子树
    heapifyRecursive(arr, n, largest);
  }
}

/**
 * 堆排序算法实现
 * @param arr 要排序的数组
 * @returns 排序后的数组
 */
export function heapSortIterative<T>(arr: T[]): T[] {
  // 复制数组以避免修改原数组
  const result = [...arr];
  const n = result.length;

  // 构建最大堆（从最后一个非叶子节点开始向上调整）
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyIterative(result, n, i); // 使用迭代版本构建堆
  }

  // 一个个从堆顶取出元素（最大值）放到数组末尾
  for (let i = n - 1; i > 0; i--) {
    // 将堆顶元素（当前最大值）与当前堆的最后一个元素交换
    [result[0], result[i]] = [result[i], result[0]];

    // 重新调整剩余堆的结构
    heapifyIterative(result, i, 0); // 使用迭代版本调整堆
  }

  return result;
}
/**
 * 调整堆结构的迭代实现，使其满足最大堆性质
 * @param arr 数组
 * @param n 当前堆的大小
 * @param i 需要调整的节点索引
 */
function heapifyIterative<T>(arr: T[], n: number, i: number): void {
  let current = i;

  // 使用循环代替递归
  while (true) {
    // 初始化最大值为当前节点
    let largest = current;
    // 计算左子节点索引
    const left = 2 * current + 1;
    // 计算右子节点索引
    const right = 2 * current + 2;

    // 如果左子节点存在且大于当前最大值，更新最大值索引
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // 如果右子节点存在且大于当前最大值，更新最大值索引
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    // 如果最大值不是当前节点，交换它们并继续调整
    if (largest !== current) {
      [arr[current], arr[largest]] = [arr[largest], arr[current]];
      // 更新当前节点为子节点，继续调整
      current = largest;
    } else {
      // 如果当前节点已经是最大值，退出循环
      break;
    }
  }
}

// 测试用例
function runTests(): void {
  // 测试1: 随机数组
  const randomArr = [64, 34, 25, 12, 22, 11, 90];
  const sortedRandomArr = heapSortRecursive([...randomArr]);
  console.log("原始数组:", randomArr);
  console.log("排序后:", sortedRandomArr);
  console.assert(
    JSON.stringify(sortedRandomArr) ===
      JSON.stringify([11, 12, 22, 25, 34, 64, 90]),
    "随机数组排序失败"
  );

  // 测试2: 已排序数组
  const sortedArr = [1, 2, 3, 4, 5];
  const sortedResult = heapSortRecursive([...sortedArr]);
  console.log("原始数组:", sortedArr);
  console.log("排序后:", sortedResult);
  console.assert(
    JSON.stringify(sortedResult) === JSON.stringify([1, 2, 3, 4, 5]),
    "已排序数组测试失败"
  );

  // 测试3: 逆序数组
  const reversedArr = [5, 4, 3, 2, 1];
  const sortedReversedArr = heapSortRecursive([...reversedArr]);
  console.log("原始数组:", reversedArr);
  console.log("排序后:", sortedReversedArr);
  console.assert(
    JSON.stringify(sortedReversedArr) === JSON.stringify([1, 2, 3, 4, 5]),
    "逆序数组排序失败"
  );

  // 测试4: 重复元素
  const duplicateArr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
  const sortedDuplicateArr = heapSortRecursive([...duplicateArr]);
  console.log("原始数组:", duplicateArr);
  console.log("排序后:", sortedDuplicateArr);
  console.assert(
    JSON.stringify(sortedDuplicateArr) ===
      JSON.stringify([1, 1, 2, 3, 4, 5, 5, 6, 9]),
    "重复元素数组排序失败"
  );

  // 测试5: 空数组
  const emptyArr: number[] = [];
  const sortedEmptyArr = heapSortRecursive([...emptyArr]);
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
