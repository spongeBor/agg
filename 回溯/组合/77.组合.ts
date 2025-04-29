export default {};
/*
 * @lc app=leetcode.cn id=77 lang=typescript
 * @lcpr version=30200
 *
 * [77] 组合
 */

// @lc code=start
function combine1(n: number, k: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number) => {
    if (path.length === k) {
      result.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(1);
  return result;
}

// 剪枝
function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number) => {
    if (path.length === k) {
      result.push([...path]);
      return;
    }
    // 剪枝优化：i <= n - (k - path.length) + 1
    // 解释：
    // 1. k - path.length 表示还需要选择的元素个数
    // 2. n - (k - path.length) + 1 表示最后一个可以作为起点的数字
    // 例如：n=4, k=3, 当path为空时，最后一个可以选的起点是2
    // 因为选了2后，还能选3和4，正好凑够3个数
    // 如果选3作为起点，最多只能再选一个4，无法凑够3个数
    for (let i = start; i <= n - (k - path.length) + 1; i++) {
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
// 4\n2\n
// @lcpr case=end

// @lcpr case=start
// 1\n1\n
// @lcpr case=end

 */
