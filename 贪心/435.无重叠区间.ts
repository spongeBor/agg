export default {};
/*
 * @lc app=leetcode.cn id=435 lang=typescript
 * @lcpr version=30200
 *
 * [435] 无重叠区间
 */

// @lc code=start
// 与452.用最少数量的箭引爆气球类似
function eraseOverlapIntervals(intervals: number[][]): number {
  // 这道题目的核心思想是贪心算法
  // 我们需要用最少的删除操作来保证没有重叠的区间

  // 如果区间数组为空，则不需要删除任何区间
  if (intervals.length === 0) return 0;

  // 按照区间的右边界进行排序
  // 这样可以优先考虑右边界较小的区间，尽可能保留更多的区间
  intervals.sort((a, b) => a[1] - b[1]);

  // 至少保留一个区间
  let count = 1;

  // 当前保留的最后一个区间的右边界
  let end = intervals[0][1];

  // 遍历剩余的区间
  for (let i = 1; i < intervals.length; i++) {
    // 如果当前区间的左边界大于等于最后一个保留区间的右边界
    // 说明当前区间与最后一个保留区间不重叠
    if (intervals[i][0] >= end) {
      // 保留当前区间
      count++;
      // 更新最后一个保留区间的右边界
      end = intervals[i][1];
    }
  }

  // 返回需要删除的区间数
  return intervals.length - count;
}
// @lc code=end

/*
// @lcpr case=start
// [[1,2],[2,3],[3,4],[1,3]]\n
// @lcpr case=end

// @lcpr case=start
// [ [1,2], [1,2], [1,2] ]\n
// @lcpr case=end

// @lcpr case=start
// [ [1,2], [2,3] ]\n
// @lcpr case=end

 */
