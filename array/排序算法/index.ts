export default {};
/**
 * 排序算法索引文件
 * 导出所有排序算法
 */

// 导出冒泡排序
export { bubbleSort } from "./冒泡排序";

// 导出选择排序
export { selectionSort } from "./选择排序";

// 导出插入排序
export { insertionSort } from "./插入排序";

// 导出希尔排序
export { shellSort } from "./希尔排序";

// 导出归并排序
export { mergeSort } from "./归并排序";

// 导出快速排序
export { quickSort } from "./快速排序";

// 导出堆排序
export { heapSort } from "./堆排序";

// 导出计数排序
export { countingSort } from "./计数排序";

// 导出桶排序
export { bucketSort } from "./桶排序";

// 导出基数排序
export { radixSort } from "./基数排序";

/**
 * 排序算法时间复杂度和稳定性比较：
 *
 * | 排序算法   | 平均时间复杂度 | 最坏时间复杂度 | 空间复杂度 | 稳定性 |
 * |-----------|--------------|--------------|-----------|------|
 * | 冒泡排序   | O(n²)        | O(n²)        | O(1)      | 稳定  |
 * | 选择排序   | O(n²)        | O(n²)        | O(1)      | 不稳定 |
 * | 插入排序   | O(n²)        | O(n²)        | O(1)      | 稳定  |
 * | 希尔排序   | O(n log n)~O(n²) | O(n²)    | O(1)      | 不稳定 |
 * | 归并排序   | O(n log n)   | O(n log n)   | O(n)      | 稳定  |
 * | 快速排序   | O(n log n)   | O(n²)        | O(log n)  | 不稳定 |
 * | 堆排序     | O(n log n)   | O(n log n)   | O(1)      | 不稳定 |
 * | 计数排序   | O(n + k)     | O(n + k)     | O(k)      | 稳定  |
 * | 桶排序     | O(n + k)     | O(n²)        | O(n + k)  | 稳定  |
 * | 基数排序   | O(n * k)     | O(n * k)     | O(n + k)  | 稳定  |
 *
 * 注：
 * - n 为数据规模
 * - k 为不同元素的个数或分组数量
 */
