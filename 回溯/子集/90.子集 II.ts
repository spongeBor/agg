export default {};
/*
 * @lc app=leetcode.cn id=90 lang=typescript
 * @lcpr version=30200
 *
 * [90] 子集 II
 */

// @lc code=start
function subsetsWithDup(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  // 先排序，让相同的元素相邻
  nums.sort((a, b) => a - b);

  function backtracking(start: number) {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      // 跳过同一层级的重复元素
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }
      path.push(nums[i]);
      backtracking(i + 1);
      path.pop();
    }
  }

  backtracking(0);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,2]\n
// @lcpr case=end

// @lcpr case=start
// [0]\n
// @lcpr case=end

 */
