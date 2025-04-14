/*
 * @lc app=leetcode.cn id=34 lang=typescript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (45.08%)
 * Likes:    2990
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 2.7M
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 *
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 *
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 6
 * 输出：[-1,-1]
 *
 * 示例 3：
 *
 *
 * 输入：nums = [], target = 0
 * 输出：[-1,-1]
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * nums 是一个非递减数组
 * -10^9 <= target <= 10^9
 *
 *
 */

// @lc code=start
function searchRange(nums: number[], target: number): number[] {
  // return searchRange1(nums, target);
  return searchRange2(nums, target);
}

function searchRange1(nums: number[], target: number): number[] {
  // [left, right]
  // 不在范围内， return [-1, -1];
  // 在范围内，但没有找到 return [-1, -1];
  // 在范围内，且有范围[leftRange + 1, rightRange - 1];
  const getRange = (isLeft = true) => {
    let range = -2;
    let left = 0,
      right = nums.length - 1;
    while (left <= right) {
      const mid = left + ~~((right - left) / 2);
      if (nums[mid] > target || (isLeft && nums[mid] === target)) {
        right = mid - 1;
        if (isLeft) {
          range = right;
        }
      } else {
        left = mid + 1;
        if (!isLeft) {
          range = left;
        }
      }
    }
    return range;
  };

  const leftRange = getRange();
  const rightRange = getRange(false);
  if (leftRange === -2 || rightRange === -2) return [-1, -1];
  if (rightRange - leftRange > 1) return [leftRange + 1, rightRange - 1];
  return [-1, -1];
}
function searchRange2(nums: number[], target: number): number[] {
  // [left, right）
  // 不在范围内， return [-1, -1];
  // 在范围内，但没有找到 return [-1, -1];
  // 在范围内，且有范围[leftRange, rightRange - 1];
  const getRange = (isLeft = true) => {
    let range = -2;
    let left = 0,
      right = nums.length;
    while (left < right) {
      const mid = left + ~~((right - left) / 2);
      if (nums[mid] > target || (isLeft && nums[mid] === target)) {
        right = mid;
        if (isLeft) {
          range = right;
        }
      } else {
        left = mid + 1;
        if (!isLeft) {
          range = left;
        }
      }
    }
    return range;
  };

  const leftRange = getRange();
  const rightRange = getRange(false);
  if (leftRange === -2 || rightRange === -2) return [-1, -1];
  if (rightRange - leftRange >= 1) return [leftRange, rightRange - 1];
  return [-1, -1];
}
// @lc code=end
