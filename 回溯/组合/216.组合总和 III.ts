export default {};
/*
 * @lc app=leetcode.cn id=216 lang=typescript
 * @lcpr version=30200
 *
 * [216] 组合总和 III
 */

// @lc code=start
function combinationSum3(k: number, n: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number) => {
    if (path.length === k) {
      if (path.reduce((a, b) => a + b, 0) === n) {
        result.push([...path]);
      }
      return;
    }
    for (let i = start; i <= 9; i++) {
      path.push(i);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(1);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// 3\n7\n
// @lcpr case=end

// @lcpr case=start
// 3\n9\n
// @lcpr case=end

// @lcpr case=start
// 4\n1\n
// @lcpr case=end

 */
