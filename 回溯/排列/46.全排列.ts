export default {};
/*
 * @lc app=leetcode.cn id=46 lang=typescript
 * @lcpr version=30200
 *
 * [46] 全排列
 */

// @lc code=start
function permute(nums: number[]): number[][] {
  // 时间复杂度：O(n!)
  // 空间复杂度：O(n)
  const result: number[][] = [];
  const path: number[] = [];
  const used: boolean[] = new Array(nums.length).fill(false);

  function backtracking() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtracking();
      path.pop();
      used[i] = false;
    }
  }

  backtracking();
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3]\n
// @lcpr case=end

// @lcpr case=start
// [0,1]\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

 */
