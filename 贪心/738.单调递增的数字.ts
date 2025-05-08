export default {};
/*
 * @lc app=leetcode.cn id=738 lang=typescript
 * @lcpr version=30200
 *
 * [738] 单调递增的数字
 */

// @lc code=start
function monotoneIncreasingDigits(n: number): number {
  // 贪心
  // 局部最优：从后往前遍历，找到第一个不满足单调递增的数字
  // 全局最优：修改后的数字是最大的单调递增数字
  let strArr = n.toString().split("");

  // 标记从哪个位置开始都需要变成9
  let flag = strArr.length;

  // 从右向左扫描，找到第一个不满足递增的位置
  for (let i = strArr.length - 1; i > 0; i--) {
    if (strArr[i - 1] > strArr[i]) {
      flag = i;
      strArr[i - 1] = (parseInt(strArr[i - 1]) - 1).toString();
    }
  }

  // 将flag及之后的所有数字都设为9
  for (let i = flag; i < strArr.length; i++) {
    strArr[i] = "9";
  }

  return parseInt(strArr.join(""));
}
// @lc code=end

/*
// @lcpr case=start
// 10\n
// @lcpr case=end

// @lcpr case=start
// 1234\n
// @lcpr case=end

// @lcpr case=start
// 332\n
// @lcpr case=end

 */
