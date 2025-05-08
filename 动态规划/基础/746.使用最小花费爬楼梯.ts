export default {};
/*
 * @lc app=leetcode.cn id=746 lang=typescript
 * @lcpr version=30200
 *
 * [746] 使用最小花费爬楼梯
 */

// @lc code=start
function minCostClimbingStairs(cost: number[]): number {
  // 动态规划
  // dp[i] 是表示到达第i个位置的最小花费， 站到0， 1 位置不需要花费
  // 状态转移方程：dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  // 初始化：dp[0] = 0, dp[1] = 0
  // 返回：dp[n]
  let dp = new Array(cost.length + 1).fill(0);
  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[cost.length];
}
// @lc code=end

/*
// @lcpr case=start
// [10,15,20]\n
// @lcpr case=end

// @lcpr case=start
// [1,100,1,1,1,100,1,1,100,1]\n
// @lcpr case=end

 */
