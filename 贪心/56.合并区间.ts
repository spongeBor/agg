export default {};
/*
 * @lc app=leetcode.cn id=56 lang=typescript
 * @lcpr version=30200
 *
 * [56] 合并区间
 */

// @lc code=start
function merge(intervals: number[][]): number[][] {
  // 这道题目的核心思想是贪心算法
  // 我们需要合并所有重叠的区间

  // 如果区间数组为空，则返回空数组
  if (intervals.length === 0) return [];

  // 按照区间的左边界进行排序
  // 这样可以方便我们判断相邻区间是否重叠
  intervals.sort((a, b) => a[0] - b[0]);

  // 结果数组，初始包含第一个区间
  const result: number[][] = [intervals[0]];

  // 遍历剩余的区间
  for (let i = 1; i < intervals.length; i++) {
    // 获取结果数组中的最后一个区间
    const lastInterval = result[result.length - 1];

    // 如果当前区间的左边界小于等于最后一个区间的右边界
    // 说明两个区间重叠，需要合并
    if (intervals[i][0] <= lastInterval[1]) {
      // 更新最后一个区间的右边界为两个区间右边界的最大值
      lastInterval[1] = Math.max(lastInterval[1], intervals[i][1]);
    } else {
      // 如果不重叠，直接将当前区间加入结果数组
      result.push(intervals[i]);
    }
  }

  // 返回合并后的区间数组
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [[1,3],[2,6],[8,10],[15,18]]\n
// @lcpr case=end

// @lcpr case=start
// [[1,4],[4,5]]\n
// @lcpr case=end

 */
