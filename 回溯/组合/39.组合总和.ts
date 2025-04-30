export default {};
/*
 * @lc app=leetcode.cn id=39 lang=typescript
 * @lcpr version=30200
 *
 * [39] 组合总和
 */

// @lc code=start
function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number) => {
    // 实现一：每次递归先计算当前路径和
    const sum = path.reduce((a, b) => a + b, 0);
    // 如果路径和大于目标值，直接返回（剪枝），如果不剪枝，会超时
    if (sum > target) {
      return;
    }
    // 找到符合条件的组合，加入结果集
    if (sum === target) {
      result.push([...path]);
      return;
    }
    // 从start开始遍历，允许重复选择同一个数字
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      // 因为可以重复选择，所以下一层的起点仍然是i
      dfs(i);
      path.pop();
    }
  };
  dfs(0);
  return result;
}

// 剪枝优化版本
function combinationSum2(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number) => {
    // 实现二：只在路径和等于目标值时处理，省去了大于目标值的判断
    if (path.reduce((a, b) => a + b, 0) === target) {
      result.push([...path]);
      return;
    }
    // 关键优化：在循环条件中直接判断添加当前数字后是否超过目标值
    // 如果超过，则不再继续遍历后续元素（更彻底的剪枝）
    for (
      let i = start;
      i < candidates.length &&
      path.reduce((a, b) => a + b, 0) + candidates[i] <= target;
      i++
    ) {
      path.push(candidates[i]);
      dfs(i);
      path.pop();
    }
  };
  dfs(0);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [2,3,6,7]\n7\n
// @lcpr case=end

// @lcpr case=start
// [2,3,5]\n8\n
// @lcpr case=end

// @lcpr case=start
// [2]\n1\n
// @lcpr case=end

 */
