export default {};
/*
 * @lc app=leetcode.cn id=15 lang=typescript
 *
 * [15] 三数之和
 *
 * https://leetcode.cn/problems/3sum/description/
 *
 * algorithms
 * Medium (39.27%)
 * Likes:    7428
 * Dislikes: 0
 * Total Accepted:    2.3M
 * Total Submissions: 5.8M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j !=
 * k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 解释：
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
 * 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
 * 注意，输出的顺序和三元组的顺序并不重要。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1,1]
 * 输出：[]
 * 解释：唯一可能的三元组和不为 0 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [0,0,0]
 * 输出：[[0,0,0]]
 * 解释：唯一可能的三元组和为 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= nums.length <= 3000
 * -10^5 <= nums[i] <= 10^5
 *
 *
 */

// @lc code=start
function threeSum(nums: number[]): number[][] {
  // 这个题的难点在于去重 （所以使用哈希法不合适，放在哈希法中是用来做类比的）
  // 1. 排序
  // 2. 双指针
  // 3. 去重
  // 4. 返回结果
  // 5. 时间复杂度 O(n^2)
  // 6. 空间复杂度 O(1)

  const result: number[][] = [];
  const sortedNums = nums.sort((a, b) => a - b);
  for (let i = 0; i < sortedNums.length - 2; i++) {
    if (sortedNums[i] > 0) break;
    if (i > 0 && sortedNums[i] === sortedNums[i - 1]) continue;
    let left = i + 1;
    let right = sortedNums.length - 1;
    while (left < right) {
      const sum = sortedNums[i] + sortedNums[left] + sortedNums[right];
      if (sum === 0) {
        result.push([sortedNums[i], sortedNums[left], sortedNums[right]]);
        while (left < right && sortedNums[left] === sortedNums[left + 1])
          left++;
        while (left < right && sortedNums[right] === sortedNums[right - 1])
          right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}
// @lc code=end
