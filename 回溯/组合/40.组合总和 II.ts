export default {};
/*
 * @lc app=leetcode.cn id=40 lang=typescript
 * @lcpr version=30200
 *
 * [40] 组合总和 II
 */

// @lc code=start
function combinationSum2(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  // 先对数组排序，方便后续去重
  candidates.sort((a, b) => a - b);

  const dfs = (start: number) => {
    // 找到符合条件的组合
    if (path.reduce((a, b) => a + b, 0) === target) {
      result.push([...path]);
      return;
    }

    // 如果当前和已经超过目标值，直接返回
    if (path.reduce((a, b) => a + b, 0) > target) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      // 去重：如果当前元素与前一个元素相同且不是第一个元素（i > start），则跳过
      if (i > start && candidates[i] === candidates[i - 1]) {
        continue;
      }

      path.push(candidates[i]);
      // 传递当前和，避免重复计算
      dfs(i + 1); // 注意这里是i+1，因为每个数字只能使用一次
      path.pop();
    }
  };

  dfs(0);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [10,1,2,7,6,1,5]\n8\n
// @lcpr case=end

// @lcpr case=start
// [2,5,2,1,2]\n5\n
// @lcpr case=end

 */
