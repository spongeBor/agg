export default {};
/*
 * @lc app=leetcode.cn id=55 lang=typescript
 * @lcpr version=30200
 *
 * [55] 跳跃游戏
 */

// @lc code=start
function canJump(nums: number[]): boolean {
  // 贪心算法
  // 局部最优：每次跳跃到最远的地方
  // 全局最优：判断是否能跳到最后一个位置
  let cover = 0;
  for (let i = 0; i <= cover; i++) {
    cover = Math.max(cover, i + nums[i]);
    if (cover >= nums.length - 1) {
      return true;
    }
  }
  return false;
}
// @lc code=end

/*
// @lcpr case=start
// [2,3,1,1,4]\n
// @lcpr case=end

// @lcpr case=start
// [3,2,1,0,4]\n
// @lcpr case=end

 */
