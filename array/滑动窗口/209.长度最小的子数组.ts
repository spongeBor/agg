export default {};
/*
 * @lc app=leetcode.cn id=209 lang=typescript
 *
 * [209] 长度最小的子数组
 *
 * https://leetcode.cn/problems/minimum-size-subarray-sum/description/
 *
 * algorithms
 * Medium (47.08%)
 * Likes:    2430
 * Dislikes: 0
 * Total Accepted:    1M
 * Total Submissions: 2.1M
 * Testcase Example:  '7\n[2,3,1,2,4,3]'
 *
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 *
 * 找出该数组中满足其总和大于等于 target 的长度最小的 子数组 [numsl, numsl+1, ..., numsr-1, numsr]
 * ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 *
 *
 * 示例 2：
 *
 *
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= target <= 10^9
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^4
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。
 *
 *
 */

// @lc code=start
function minSubArrayLen(target: number, nums: number[]): number {
  // (O(n ^ 2) 时间复杂度)不能通过全部测试用例
  // return bruteForce(target, nums);
  return minSubArrayLen1(target, nums);
}
function bruteForce(target: number, nums: number[]) {
  let res = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) {
        const subLength = j - i + 1;
        res = Math.min(res, subLength);
        break;
      }
    }
  }
  return res === Infinity ? 0 : res;
}

function minSubArrayLen1(target: number, nums: number[]): number {
  // O(n) 时间复杂度，使用滑动窗口
  let res = Infinity;
  let start = 0,
    end = 0;
  let sum = 0;
  while (end < nums.length) {
    sum += nums[end];
    while (sum >= target) {
      res = Math.min(res, end - start + 1);
      sum -= nums[start++];
    }
    end++;
  }
  return res === Infinity ? 0 : res;
}
// @lc code=end
