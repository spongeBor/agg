export default {};
/*
 * @lc app=leetcode.cn id=45 lang=typescript
 * @lcpr version=30200
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
function jump(nums: number[]): number {
  // 贪心算法
  // 局部最优：当前位置能跳到的最远位置
  // 全局最优：计算最少跳跃次数

  // result 记录跳跃的次数
  let result = 0;
  // curDistance 表示当前能跳到的最远距离（当前覆盖范围）
  let curDistance = 0;
  // nextDistance 表示下一步能跳到的最远距离（下一步覆盖范围）
  let nextDistance = 0;

  // 遍历数组，但不包括最后一个元素，因为到达最后一个元素就结束了，不需要再跳
  // 注意这里是 nums.length - 1，因为我们不需要从最后一个位置起跳
  for (let i = 0; i < nums.length - 1; i++) {
    // 更新下一步能跳到的最远距离
    // i + nums[i] 表示从当前位置 i 能跳到的最远位置
    // 取 i + nums[i] 和已知的 nextDistance 的最大值
    nextDistance = Math.max(i + nums[i], nextDistance);

    // 如果当前位置已经是当前覆盖范围的边界
    if (i === curDistance) {
      // 更新当前覆盖范围为下一步覆盖范围
      curDistance = nextDistance;
      // 跳跃次数加1
      result++;
    }
  }

  // 返回最少跳跃次数
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [2,3,1,1,4]\n
// @lcpr case=end

// @lcpr case=start
// [2,3,0,1,4]\n
// @lcpr case=end

 */
