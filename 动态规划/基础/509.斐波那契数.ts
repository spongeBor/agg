export default {};
/*
 * @lc app=leetcode.cn id=509 lang=typescript
 * @lcpr version=30200
 *
 * [509] 斐波那契数
 */

// @lc code=start
function fib(n: number): number {
  // 动态规划
  // 定义dp数组，dp[i]表示第i个斐波那契数
  // 状态转移方程：dp[i] = dp[i - 1] + dp[i - 2]
  // 初始化：dp[0] = 0, dp[1] = 1
  // 返回：dp[n]
  if (n <= 1) return n;
  let dp0 = 0;
  let dp1 = 1;
  for (let i = 2; i <= n; i++) {
    [dp0, dp1] = [dp1, dp0 + dp1];
  }
  return dp1;
}
// @lc code=end

/*
// @lcpr case=start
// 2\n
// @lcpr case=end

// @lcpr case=start
// 3\n
// @lcpr case=end

// @lcpr case=start
// 4\n
// @lcpr case=end

 */
