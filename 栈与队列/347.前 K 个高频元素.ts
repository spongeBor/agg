export default {};
/*
 * @lc app=leetcode.cn id=347 lang=typescript
 * @lcpr version=30104
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start

// TODO: 理解堆的实现
/**
 * 这个算法的时间复杂度是 O(n log k)，其中：
 * 遍历数组统计频率需要 O(n) 时间
 * 构建和维护大小为 k 的小顶堆，每次插入操作需要 O(log k) 时间
 * 对于 n 个不同的元素，堆操作总共需要 O(n log k) 时间
 * 最后从堆中提取元素需要 O(k log k) 时间
 * 因为 n 通常大于 k，所以总体时间复杂度为 O(n log k)。
 * @param nums
 * @param k
 * @returns
 */
function topKFrequent(nums: number[], k: number): number[] {
  // 使用Map统计每个元素出现的频率
  const map = new Map<number, number>();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  // 创建小顶堆，按频率从小到大排序
  const heap = new MinHeap((a, b) => a - b, k);

  // 遍历频率Map，将元素和频率加入堆中
  for (const [num, count] of map.entries()) {
    heap.push(num, count);
  }

  // 提取堆中的元素（按频率从大到小）
  const result: number[] = [];
  while (heap.size > 0) {
    const [num] = heap.pop()!;
    result.unshift(num); // 因为是小顶堆，所以需要从前面插入
  }

  return result;
}

// 创建一个小顶堆，按照频率比较
class MinHeap {
  // 存储堆元素的数组，每个元素是一个元组 [数字, 频率]
  heap: [number, number][] = [];

  constructor(
    // 比较函数，用于确定元素的优先级顺序
    private compare: (a: number, b: number) => number,
    // 堆的最大容量，用于保留前k个高频元素
    private k: number
  ) {}

  // 获取堆的当前大小
  get size(): number {
    return this.heap.length;
  }

  // 向堆中添加新元素
  push(num: number, count: number): void {
    // 将新元素添加到堆的末尾
    this.heap.push([num, count]);
    // 将新添加的元素上浮到合适位置，维护堆的性质
    this.shiftUp(this.size - 1);

    // 如果堆的大小超过k，则移除堆顶元素（频率最小的元素）
    // 这样确保堆中始终保留频率最高的k个元素
    if (this.size > this.k) {
      this.pop();
    }
  }

  // 弹出堆顶元素（频率最小的元素）
  pop(): [number, number] | undefined {
    // 如果堆为空，返回undefined
    if (this.size === 0) return undefined;

    // 保存堆顶元素作为返回值
    const top = this.heap[0];
    // 取出堆的最后一个元素
    const bottom = this.heap.pop()!;

    // 如果堆不为空，将最后一个元素放到堆顶，然后下沉到合适位置
    if (this.size > 0) {
      this.heap[0] = bottom;
      this.shiftDown(0);
    }

    return top;
  }

  // 上浮操作：将指定索引的元素向上移动到合适位置
  shiftUp(index: number): void {
    while (index > 0) {
      // 计算父节点索引
      const parentIndex = Math.floor((index - 1) / 2);
      // 如果父节点的频率小于或等于当前节点的频率，停止上浮
      if (this.compare(this.heap[parentIndex][1], this.heap[index][1]) <= 0)
        break;

      // 交换当前节点与父节点
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      // 更新索引，继续向上检查
      index = parentIndex;
    }
  }

  // 下沉操作：将指定索引的元素向下移动到合适位置
  shiftDown(index: number): void {
    // 获取堆的最后一个元素的索引
    const lastIndex = this.size - 1;
    while (true) {
      // 计算左右子节点的索引
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      // 初始假设当前节点就是最小的
      let findIndex = index;

      // 如果左子节点存在且频率小于当前最小节点，更新最小节点为左子节点
      if (
        leftIndex <= lastIndex &&
        this.compare(this.heap[leftIndex][1], this.heap[findIndex][1]) < 0
      ) {
        findIndex = leftIndex;
      }

      // 如果右子节点存在且频率小于当前最小节点，更新最小节点为右子节点
      if (
        rightIndex <= lastIndex &&
        this.compare(this.heap[rightIndex][1], this.heap[findIndex][1]) < 0
      ) {
        findIndex = rightIndex;
      }

      // 如果当前节点就是最小的，停止下沉
      if (findIndex === index) break;

      // 交换当前节点与找到的最小节点
      [this.heap[index], this.heap[findIndex]] = [
        this.heap[findIndex],
        this.heap[index],
      ];
      // 更新索引，继续向下检查
      index = findIndex;
    }
  }
}
// @lc code=end

/*
// @lcpr case=start
// [1,1,1,2,2,3]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1]\n1\n
// @lcpr case=end

 */
