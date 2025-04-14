/*
 * @lc app=leetcode.cn id=704 lang=typescript
 *
 * [704] 二分查找
 *
 * https://leetcode.cn/problems/binary-search/description/
 *
 * algorithms
 * Easy (56.20%)
 * Likes:    1738
 * Dislikes: 0
 * Total Accepted:    1.5M
 * Total Submissions: 2.6M
 * Testcase Example:  '[-1,0,3,5,9,12]\n9'
 *
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的
 * target，如果目标值存在返回下标，否则返回 -1。
 *
 *
 * 示例 1:
 *
 * 输入: nums = [-1,0,3,5,9,12], target = 9
 * 输出: 4
 * 解释: 9 出现在 nums 中并且下标为 4
 *
 *
 * 示例 2:
 *
 * 输入: nums = [-1,0,3,5,9,12], target = 2
 * 输出: -1
 * 解释: 2 不存在 nums 中因此返回 -1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 你可以假设 nums 中的所有元素是不重复的。
 * n 将在 [1, 10000]之间。
 * nums 的每个元素都将在 [-9999, 9999]之间。
 *
 *
 */

// @lc code=start
function search(nums: number[], target: number): number {
  // return search1(nums, target);
  return search2(nums, target);
}
function search1(nums: number[], target: number): number {
  // 范围[left, right]
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + ~~((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

function search2(nums: number[], target: number): number {
  // 范围 [left, right)
  let left = 0,
    right = nums.length;
  while (left < right) {
    const mid = left + ~~((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}
// @lc code=end
