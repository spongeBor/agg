export default {};
/*
 * @lc app=leetcode.cn id=59 lang=typescript
 *
 * [59] 螺旋矩阵 II
 *
 * https://leetcode.cn/problems/spiral-matrix-ii/description/
 *
 * algorithms
 * Medium (70.74%)
 * Likes:    1446
 * Dislikes: 0
 * Total Accepted:    538.3K
 * Total Submissions: 760.9K
 * Testcase Example:  '3'
 *
 * 给你一个正整数 n ，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3
 * 输出：[[1,2,3],[8,9,4],[7,6,5]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1
 * 输出：[[1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 *
 *
 */

// @lc code=start
function generateMatrix(n: number): number[][] {
  let startX = 0,
    startY = 0; // 起始位置
  let loop = ~~(n / 2); // 旋转圈数
  let mid = ~~(n / 2); // 中间位置
  let offset = 1; // 控制每一层填充元素个数
  let count = 1; // 更新填充数字

  let res = new Array(n).fill(0).map(() => new Array(n).fill(0));

  while (loop--) {
    let row = startX,
      col = startY;
    // 上行从左到右[)
    for (; col < n - offset; col++) {
      res[row][col] = count++;
    }
    // 右列从上到下[)
    for (; row < n - offset; row++) {
      res[row][col] = count++;
    }
    // 下行从右到左[)
    for (; col > startY; col--) {
      res[row][col] = count++;
    }
    // 左列从下至上[）
    for (; row > startX; row--) {
      res[row][col] = count++;
    }

    // 更新起始位置
    startX++;
    startY++;
    offset++;
  }
  if (n % 2 === 1) {
    res[mid][mid] = count;
  }
  return res;
}
// @lc code=end
