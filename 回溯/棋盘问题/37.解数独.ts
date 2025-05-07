export default {};
/*
 * @lc app=leetcode.cn id=37 lang=typescript
 * @lcpr version=30200
 *
 * [37] 解数独
 */

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
  // 时间复杂度：O(9^(9*9))，最坏情况下需要尝试填充所有空格的所有可能数字
  // 空间复杂度：O(9*9)，需要存储棋盘状态

  function isValid(row: number, col: number, val: string): boolean {
    // 检查同一行是否有重复
    for (let j = 0; j < 9; j++) {
      if (board[row][j] === val) return false;
    }

    // 检查同一列是否有重复
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === val) return false;
    }

    // 检查3x3宫格内是否有重复
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === val) return false;
      }
    }

    return true;
  }

  function backtracking(row: number, col: number): boolean {
    // 终止条件：所有行都已填完
    if (row === 9) return true;

    // 当前列填完，转到下一行
    if (col === 9) return backtracking(row + 1, 0);

    // 如果当前位置已有数字，跳到下一个位置
    if (board[row][col] !== ".") return backtracking(row, col + 1);

    // 尝试填入1-9
    for (let val = 1; val <= 9; val++) {
      const strVal = val.toString();

      // 判断当前位置是否可以填入该值
      if (isValid(row, col, strVal)) {
        // 填入值
        board[row][col] = strVal;

        // 继续填下一个位置
        if (backtracking(row, col + 1)) return true;

        // 回溯
        board[row][col] = ".";
      }
    }

    // 所有数字都尝试过，无解
    return false;
  }

  backtracking(0, 0);
}
// @lc code=end

/*
// @lcpr case=start
// \n[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]\n
// @lcpr case=end

 */
