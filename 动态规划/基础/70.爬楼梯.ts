export default {};
/*
 * @lc app=leetcode.cn id=70 lang=typescript
 * @lcpr version=30200
 *
 * [70] 爬楼梯
 */

// @lc code=start
function climbStairs(n: number): number {
  // 动态规划
  // dp[i] 是爬到第i个台阶的方法数， i == 0 没意义
  // 状态转移方程：dp[i] = dp[i-1] + dp[i-2]
  // 初始化：dp[0] = 1, dp[1] = 1
  // 返回：dp[n]
  let dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
// @lc code=end

/*
// @lcpr case=start
// 2\n
// @lcpr case=end

// @lcpr case=start
// 3\n
// @lcpr case=end

 */
