export default {};
/*
 * @lc app=leetcode.cn id=452 lang=typescript
 * @lcpr version=30200
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
function findMinArrowShots(points: number[][]): number {
  // 这道题目的核心思想是贪心算法
  // 我们需要用最少的箭来引爆所有气球

  // 如果气球数组为空，则不需要箭
  if (points.length === 0) return 0;

  // 按照气球的右边界进行排序
  // 这样可以优先考虑右边界较小的气球，尽可能让一支箭穿过多个气球
  points.sort((a, b) => a[1] - b[1]);

  // 至少需要一支箭
  let count = 1;

  // 第一支箭的位置设在第一个气球的右边界
  // 这样可以保证射爆第一个气球，同时可能射爆其他气球
  let end = points[0][1];

  // 遍历剩余的气球
  for (let i = 1; i < points.length; i++) {
    // 如果当前气球的左边界大于前一支箭的位置
    // 说明前一支箭无法射爆当前气球，需要增加一支新箭
    if (points[i][0] > end) {
      // 箭数量加1
      count++;
      // 新箭的位置设在当前气球的右边界
      end = points[i][1];
    }
    // 如果当前气球的左边界小于等于前一支箭的位置
    // 说明当前气球可以被前一支箭射爆，不需要增加新箭
    // 此时不需要更新end，因为我们已经按右边界排序，当前气球的右边界一定大于等于前一个气球的右边界
  }

  // 返回最少需要的箭数
  return count;
}
// @lc code=end

/*
// @lcpr case=start
// [[10,16],[2,8],[1,6],[7,12]]\n
// @lcpr case=end

// @lcpr case=start
// [[1,2],[3,4],[5,6],[7,8]]\n
// @lcpr case=end

// @lcpr case=start
// [[1,2],[2,3],[3,4],[4,5]]\n
// @lcpr case=end

 */
