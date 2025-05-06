export default {};
/*
 * @lc app=leetcode.cn id=78 lang=typescript
 * @lcpr version=30200
 *
 * [78] 子集
 */

// @lc code=start
function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  function backtracking(start: number) {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
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
// [1,2,3]\n
// @lcpr case=end

// @lcpr case=start
// [0]\n
// @lcpr case=end

 */
