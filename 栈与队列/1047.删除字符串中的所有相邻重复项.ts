export default {};
/*
 * @lc app=leetcode.cn id=1047 lang=typescript
 * @lcpr version=30104
 *
 * [1047] 删除字符串中的所有相邻重复项
 */

// @lc code=start
function removeDuplicates(s: string): string {
  const stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    // 如果栈不为空且栈顶元素与当前字符相同，则弹出栈顶元素（相邻重复项抵消）
    if (stack.length > 0 && stack[stack.length - 1] === s[i]) {
      stack.pop();
    } else {
      // 否则将当前字符入栈
      stack.push(s[i]);
    }
  }
  return stack.join("");
}
// @lc code=end

/*
// @lcpr case=start
// "abbaca"\n
// @lcpr case=end

 */
