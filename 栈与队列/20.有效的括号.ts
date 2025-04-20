/*
 * @lc app=leetcode.cn id=20 lang=typescript
 * @lcpr version=30104
 *
 * [20] 有效的括号
 */

// @lc code=start
function isValid(s: string): boolean {
  const stack = [];
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  if (s.length % 2 !== 0) return false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      if (stack.pop() !== map[s[i]]) return false;
    } else {
      stack.push(s[i]);
    }
  }
  return stack.length === 0;
}
// @lc code=end

/*
// @lcpr case=start
// "()"\n
// @lcpr case=end

// @lcpr case=start
// "()[]{}"\n
// @lcpr case=end

// @lcpr case=start
// "(]"\n
// @lcpr case=end

// @lcpr case=start
// "([])"\n
// @lcpr case=end

 */
