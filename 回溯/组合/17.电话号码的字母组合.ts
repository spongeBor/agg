export default {};
/*
 * @lc app=leetcode.cn id=17 lang=typescript
 * @lcpr version=30200
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];
  const result: string[] = [];
  const path: string[] = [];
  const letterMap = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };
  const dfs = (index: number) => {
    if (index === digits.length) {
      result.push(path.join(""));
      return;
    }
    const digit = digits[index];
    const letters = letterMap[digit];
    for (const letter of letters) {
      path.push(letter);
      dfs(index + 1);
      path.pop();
    }
  };
  dfs(0);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// "23"\n
// @lcpr case=end

// @lcpr case=start
// ""\n
// @lcpr case=end

// @lcpr case=start
// "2"\n
// @lcpr case=end

 */
