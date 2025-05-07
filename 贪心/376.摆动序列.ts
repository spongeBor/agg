export default {};
/*
 * @lc app=leetcode.cn id=376 lang=typescript
 * @lcpr version=30200
 *
 * [376] 摆动序列
 */

// @lc code=start
function wiggleMaxLength(nums: number[]): number {
  // 函数定义：计算数组中最长摆动序列的长度

  // 贪心策略说明：
  // 局部最优：删除单调坡度上的节点（不包括单调坡度两端的节点），那么这个坡度就可以有两个局部峰值。
  // 全局最优：整个序列有最多的局部峰值，从而达到最长摆动序列。
  // 情况一：上下坡中有平坡
  // 情况二：数组首尾两端
  // 情况三：单调坡中有平坡

  // 处理边界情况：如果数组长度小于等于1，直接返回数组长度
  if (nums.length <= 1) return nums.length;

  // 初始化结果为1，因为至少有一个元素
  let result = 1;

  // preDiff记录前一个差值，初始为0表示还没有差值
  let preDiff = 0;

  // 从第二个元素开始遍历数组
  for (let i = 1; i < nums.length; i++) {
    // 计算当前元素与前一个元素的差值
    let curDiff = nums[i] - nums[i - 1];

    // 判断是否形成了峰值或谷值：
    // 1. 当前差值为正且前一个差值为负或零，说明形成了谷到峰的转折
    // 2. 当前差值为负且前一个差值为正或零，说明形成了峰到谷的转折
    if ((curDiff > 0 && preDiff <= 0) || (curDiff < 0 && preDiff >= 0)) {
      // 找到一个新的峰值或谷值，结果加1
      result++;
      // 更新前一个差值为当前差值
      preDiff = curDiff;
    }
  }

  // 返回最长摆动序列的长度
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,7,4,9,2,5]\n
// @lcpr case=end

// @lcpr case=start
// [1,17,5,10,13,15,10,5,16,8]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4,5,6,7,8,9]\n
// @lcpr case=end

 */
