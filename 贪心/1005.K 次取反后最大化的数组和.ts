export default {};
/*
 * @lc app=leetcode.cn id=1005 lang=typescript
 * @lcpr version=30200
 *
 * [1005] K 次取反后最大化的数组和
 */

// @lc code=start
function largestSumAfterKNegations(nums: number[], k: number): number {
  // 局部最优：每次取反最小的数
  // 全局最优：数组和最大

  // 按照绝对值从大到小排序
  nums.sort((a, b) => Math.abs(b) - Math.abs(a));

  // 先将负数取反（优先取反最大的负数）
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0 && k > 0) {
      nums[i] = -nums[i];
      k--;
    }
  }

  // 如果k还有剩余且为奇数，取反最小的数（此时数组中都是正数）
  if (k % 2 === 1) {
    nums[nums.length - 1] = -nums[nums.length - 1];
  }

  // 计算数组和
  return nums.reduce((a, b) => a + b, 0);
}
// @lc code=end

/*
// @lcpr case=start
// [4,2,3]\n1\n
// @lcpr case=end

// @lcpr case=start
// [3,-1,0,2]\n3\n
// @lcpr case=end

// @lcpr case=start
// [2,-3,-1,5,-4]\n2\n
// @lcpr case=end

 */
