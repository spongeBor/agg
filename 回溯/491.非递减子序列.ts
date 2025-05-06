export default {};
/*
 * @lc app=leetcode.cn id=491 lang=typescript
 * @lcpr version=30200
 *
 * [491] 非递减子序列
 */

// @lc code=start
function findSubsequences(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  function backtracking(start: number) {
    // 只有当路径长度大于等于2时才添加到结果中
    if (path.length >= 2) {
      result.push([...path]);
    }

    // 用于在同一层去重
    const used: Set<number> = new Set();

    for (let i = start; i < nums.length; i++) {
      // 如果当前元素小于路径中的最后一个元素，或者当前层已经使用过这个数字，则跳过
      if (
        (path.length > 0 && nums[i] < path[path.length - 1]) ||
        used.has(nums[i])
      ) {
        continue;
      }

      // 记录这个数字在本层已经使用过
      used.add(nums[i]);
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
// [4,6,7,7]\n
// @lcpr case=end

// @lcpr case=start
// [4,4,3,2,1]\n
// @lcpr case=end

 */
