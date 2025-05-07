export default {};
/*
 * @lc app=leetcode.cn id=406 lang=typescript
 * @lcpr version=30200
 *
 * [406] 根据身高重建队列
 */

// @lc code=start
function reconstructQueue(people: number[][]): number[][] {
  // 局部最优：优先安排身高较高的人，如果身高相同，则按照 k 值较小的先安排
  // 全局最优：最终形成的队列满足题目要求
  // 按照身高降序排序，如果身高相同，则按照 k 值升序排序
  people.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return b[0] - a[0];
    }
  });
  const result: number[][] = [];
  for (let i = 0; i < people.length; i++) {
    result.splice(people[i][1], 0, people[i]);
  }
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]\n
// @lcpr case=end

// @lcpr case=start
// [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]\n
// @lcpr case=end

 */
