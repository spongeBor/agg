export default {};
/*
 * @lc app=leetcode.cn id=1049 lang=typescript
 * @lcpr version=30200
 *
 * [1049] 最后一块石头的重量 II
 */

// @lc code=start
function lastStoneWeightII(stones: number[]): number {
  // 01背包问题
  // 背包的容量为总重量的一半
  // 背包的物品为石头
  // 背包的物品的重量为石头
  // 背包的物品的价值为石头
  let sum = stones.reduce((a, b) => a + b, 0);
  let target = Math.floor(sum / 2);
  let dp = new Array(target + 1).fill(0);
  for (let i = 0; i < stones.length; i++) {
    for (let j = target; j >= stones[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i]);
    }
  }
  return sum - 2 * dp[target];
}
// @lc code=end

/*
// @lcpr case=start
// [2,7,4,1,8,1]\n
// @lcpr case=end

// @lcpr case=start
// [31,26,33,21,40]\n
// @lcpr case=end

 */
