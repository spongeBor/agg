export default {};
/*
 * @lc app=leetcode.cn id=69 lang=typescript
 *
 * [69] x 的平方根
 *
 * https://leetcode.cn/problems/sqrtx/description/
 *
 * algorithms
 * Easy (38.71%)
 * Likes:    1657
 * Dislikes: 0
 * Total Accepted:    1M
 * Total Submissions: 2.7M
 * Testcase Example:  '4'
 *
 * 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
 *
 * 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
 *
 * 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：x = 4
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：x = 8
 * 输出：2
 * 解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= x <= 2^31 - 1
 *
 *
 */

// @lc code=start
function mySqrt(x: number): number {
  let left = 0,
    right = x,
    res = -1;
  while (left <= right) {
    const mid = left + ~~((right - left) / 2);
    if (mid * mid <= x) {
      left = mid + 1;
      res = mid; // 在这个二分查找算法中，res的赋值放在 mid * mid <= x 条件中是因为我们需要找到最大的整数 mid，
    } else {
      right = mid - 1;
    }
  }
  return res;
}
// @lc code=end
