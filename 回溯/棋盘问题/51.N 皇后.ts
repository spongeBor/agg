export default {};
/*
 * @lc app=leetcode.cn id=51 lang=typescript
 * @lcpr version=30200
 *
 * [51] N 皇后
 */

// @lc code=start
function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const board: string[][] = new Array(n)
    .fill(0)
    .map(() => new Array(n).fill("."));

  function isValid(row: number, col: number) {
    // 检查同一列
    for (let i = 0; i < row; i++) {
      if (board[i][col] === "Q") return false;
    }
    // 检查左上角
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false;
    }
    // 检查右上角
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === "Q") return false;
    }
    return true;
  }

  function backtracking(row: number) {
    // 终止条件
    // 如果行数等于n，说明已经找到了一种解法，将board转换为字符串数组并加入结果集
    if (row === n) {
      result.push(board.map((row) => row.join("")));
      return;
    }
    // 遍历列
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = "Q";
        backtracking(row + 1);
        board[row][col] = ".";
      }
    }
  }

  backtracking(0);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// 4\n
// @lcpr case=end

// @lcpr case=start
// 1\n
// @lcpr case=end

 */
