export default {};
/*
 * @lc app=leetcode.cn id=239 lang=typescript
 * @lcpr version=30104
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
function maxSlidingWindow(nums: number[], k: number): number[] {
  // 单调队列：单调队列的本质是双端队列，队列中的元素是单调的，可以是单调递增或单调递减
  // 单调队列的性质：
  // 1. 队列中的元素是单调的（这里我们维护单调递减队列）
  // 2. 队列中存储的是元素的索引，而不是元素本身
  // 3. 队列头部始终是当前窗口的最大值的索引
  const queue: number[] = [];
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    // 移除队列中所有小于当前元素的值，保持单调递减
    while (queue.length > 0 && nums[queue[queue.length - 1]] < nums[i]) {
      queue.pop();
    }
    // 将当前元素索引加入队列
    queue.push(i);

    // 移除队列头部不在当前窗口范围内的元素
    if (queue[0] <= i - k) {
      queue.shift();
    }

    // 当窗口形成后，将队列头部（最大值）加入结果
    if (i >= k - 1) {
      result.push(nums[queue[0]]);
    }
  }
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,3,-1,-3,5,3,6,7]\n3\n
// @lcpr case=end

// @lcpr case=start
// [1]\n1\n
// @lcpr case=end

 */
