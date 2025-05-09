export default {};
/*
 * @lc app=leetcode.cn id=416 lang=typescript
 * @lcpr version=30200
 *
 * [416] 分割等和子集
 */

// @lc code=start
function canPartition(nums: number[]): boolean {
  // 第一步：计算数组总和
  // 使用reduce函数累加数组中所有元素
  let sum = nums.reduce((a, b) => a + b, 0);

  // 第二步：判断总和是否为奇数
  // 如果总和是奇数，不可能分割成两个相等的子集（因为整数不能被分为两个相等的部分）
  if (sum % 2 !== 0) return false;

  // 第三步：确定目标值
  // 如果能够找到一个子集，其和为总和的一半，那么剩下的元素和也必然等于总和的一半
  let target = sum / 2;

  // 第四步：创建动态规划数组
  // dp[j]表示容量为j的背包所能装下的最大价值
  // 在这个问题中，物品的重量和价值都是nums[i]
  let dp = new Array(target + 1).fill(0);

  // 第五步：动态规划过程
  // 外层循环遍历每个数字（相当于物品）
  for (let i = 0; i < nums.length; i++) {
    // 内层循环从target到nums[i]逆序遍历（确保每个数字只被使用一次，这是0-1背包的特点）
    for (let j = target; j >= nums[i]; j--) {
      // 状态转移方程：
      // 不选当前数字：保持dp[j]不变
      // 选择当前数字：dp[j-nums[i]] + nums[i]（前提是背包还有足够空间）
      // 取两者的最大值
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
    }
  }

  // 第六步：判断结果
  // 如果dp[target]等于target，说明可以恰好找到一个子集，其和为target
  // 这意味着数组可以被分割成两个等和子集
  return dp[target] === target;
}
// @lc code=end

/*
// @lcpr case=start
// [1,5,11,5]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,5]\n
// @lcpr case=end

 */
