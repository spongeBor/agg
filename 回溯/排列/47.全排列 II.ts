export default {};
/*
 * @lc app=leetcode.cn id=47 lang=typescript
 * @lcpr version=30200
 *
 * [47] 全排列 II
 */

// @lc code=start
function permuteUnique(nums: number[]): number[][] {
  // 时间复杂度：O(n!)
  // 空间复杂度：O(n)
  const result: number[][] = [];
  const path: number[] = [];
  const used: boolean[] = new Array(nums.length).fill(false);
  nums.sort((a, b) => a - b); // 排序，为了方便去重

  function backtracking() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 去重逻辑：如果当前元素与前一个元素相同，并且前一个元素未被使用，则跳过
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

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
// [1,1,2]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3]\n
// @lcpr case=end

 */
