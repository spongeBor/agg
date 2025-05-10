export default {};
/*
 * @lc app=leetcode.cn id=1049 lang=typescript
 * @lcpr version=30200
 *
 * [1049] 最后一块石头的重量 II
 */

// @lc code=start
function lastStoneWeightII(stones: number[]): number {
  // 这个问题可以转化为01背包问题：
  // 1. 问题本质：将石头分成两堆，使得两堆重量差最小
  // 2. 转化详细思路：
  //    - 石头碰撞的本质是两块石头重量的差值，即|a-b|
  //    - 对于多次碰撞，相当于给每块石头赋予"+"或"-"符号后求和
  //    - 例如有石头[a,b,c,d]，结果可以表示为(±a)±b±c±d
  //    - 这等同于将所有石头分成两组S1和S2，求|S1-S2|的最小值
  //    - 假设总重量为sum，则S1+S2=sum，我们要求的是|S1-S2|
  //    - 可以推导出|S1-S2|=|sum-2*S2|（假设S2较小）
  //    - 因此，要使|S1-S2|最小，就是要让S2尽可能接近sum/2
  //    - 这就转化为经典的01背包问题：在所有石头中选择一些，
  //      使总重量不超过且尽可能接近sum/2

  // 计算所有石头的总重量
  let sum = stones.reduce((a, b) => a + b, 0);

  // 目标容量为总重量的一半（向下取整）
  let target = Math.floor(sum / 2);

  // 创建dp数组，dp[j]表示容量为j的背包能装下的最大石头重量
  let dp = new Array(target + 1).fill(0);

  // 遍历每个石头
  for (let i = 0; i < stones.length; i++) {
    // 从大到小遍历背包容量，避免重复使用同一个石头
    // 这是01背包问题的特点，每个物品只能用一次
    for (let j = target; j >= stones[i]; j--) {
      // 对于当前容量j，有两种选择：
      // 1. 不放入当前石头：保持dp[j]不变
      // 2. 放入当前石头：dp[j-stones[i]] + stones[i]
      // 选择能使背包中重量最大的方案
      dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i]);
    }
  }

  // 最终结果解释：
  // - dp[target]表示我们能装入重量不超过sum/2的背包的最大石头重量
  // - 这些石头为一组(S2)，剩余的石头为另一组(S1)
  // - S1 = sum - dp[target]
  // - S2 = dp[target]
  // - 两堆石头的差值为：|S1 - S2| = |sum - dp[target] - dp[target]| = |sum - 2*dp[target]|
  // 由于dp[target]总是小于等于sum/2，所以sum-2*dp[target]总是大于等于0，可以去掉绝对值符号
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
