export default {};
/*
 * @lc app=leetcode.cn id=343 lang=typescript
 * @lcpr version=30200
 *
 * [343] 整数拆分
 */

// @lc code=start
function integerBreak(n: number): number {
  // 动态规划
  // dp[i] 表示拆分整数i的最大乘积
  // 对于每个整数i，可以将其拆分为j和(i-j)两部分，其中j是一个小于i的正整数
  // 有两种情况需要考虑：
  // 1. (i-j)不再拆分，乘积为j*(i-j)
  // 2. (i-j)继续拆分，乘积为j*dp[i-j]，其中dp[i-j]是(i-j)拆分后的最大乘积
  // 取所有可能的j值中的最大值，得到状态转移方程：
  // dp[i] = max(dp[i], (i-j)*j, dp[i-j]*j) 对所有的1≤j<i
  // 初始条件：
  // dp[0] = 0：0无法拆分
  // dp[1] = 0：1无法拆分
  // dp[2] = 1：2只能拆分为1+1，乘积为1*1=1
  let dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 0;
  dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    // 从1到i/2，因为j和i-j是对称的，所以只需要考虑一半
    for (let j = 1; j <= i / 2; j++) {
      // dp[i]：当前已知的最大乘积
      // (i-j)*j：将i拆分为j和(i-j)，且(i-j)不再拆分的乘积
      // dp[i-j]*j：将i拆分为j和(i-j)，且(i-j)继续拆分的乘积，这里dp[i-j]表示将(i-j)拆分后的最大乘积
      dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j);
    }
  }
  return dp[n];
}
// @lc code=end

/*
// @lcpr case=start
// 2\n
// @lcpr case=end

// @lcpr case=start
// 10\n
// @lcpr case=end

 */
