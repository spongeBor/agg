export default {};
/*
 * @lc app=leetcode.cn id=35 lang=typescript
 *
 * [35] 搜索插入位置
 *
 * https://leetcode.cn/problems/search-insert-position/description/
 *
 * algorithms
 * Easy (47.99%)
 * Likes:    2491
 * Dislikes: 0
 * Total Accepted:    1.7M
 * Total Submissions: 3.6M
 * Testcase Example:  '[1,3,5,6]\n5'
 *
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 *
 * 请必须使用时间复杂度为 O(log n) 的算法。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,3,5,6], target = 5
 * 输出: 2
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [1,3,5,6], target = 2
 * 输出: 1
 *
 *
 * 示例 3:
 *
 *
 * 输入: nums = [1,3,5,6], target = 7
 * 输出: 4
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 10^4
 * -10^4 <= nums[i] <= 10^4
 * nums 为 无重复元素 的 升序 排列数组
 * -10^4 <= target <= 10^4
 *
 *
 */

// @lc code=start
function searchInsert(nums: number[], target: number): number {
  // return searchInsert1(nums, target);
  return searchInsert2(nums, target);
}
function searchInsert1(nums: number[], target: number): number {
  // 范围 [left, right]

  // 超出左边 [0, -1], return right + 1;
  // 找到位置, return mid;
  // 未超出，没有找到位置 return right + 1;
  // 超出右边 return right + 1;
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + ~~((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return right + 1;
}

function searchInsert2(nums: number[], target: number): number {
  // 范围[left , right)

  // 超出左边 [0, 0), return right;
  // 找到位置, return mid;
  // 未超出，没有找到位置 return right;
  // 超出右边 return right;
  let left = 0,
    right = nums.length;
  while (left < right) {
    const mid = left + ~~((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return right;
}

// @lc code=end
