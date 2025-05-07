export default {};
/*
 * @lc app=leetcode.cn id=860 lang=typescript
 * @lcpr version=30200
 *
 * [860] 柠檬水找零
 */

// @lc code=start
function lemonadeChange(bills: number[]): boolean {
  // 局部最优：优先使用 10 + 5 组合找零
  // 全局最优：尽可能多地找零
  let five = 0;
  let ten = 0;

  for (let i = 0; i < bills.length; i++) {
    if (bills[i] === 5) {
      five++;
    } else if (bills[i] === 10) {
      if (five <= 0) return false;
      five--;
      ten++;
    } else if (bills[i] === 20) {
      // 优先使用 10 + 5 组合找零
      if (ten > 0 && five > 0) {
        ten--;
        five--;
      } else if (five >= 3) {
        // 如果没有 10 元，则使用 3 个 5 元找零
        five -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
}
// @lc code=end

/*
// @lcpr case=start
// [5,5,5,10,20]\n
// @lcpr case=end

// @lcpr case=start
// [5,5,10,10,20]\n
// @lcpr case=end

 */
