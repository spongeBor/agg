export default {};
/*
 * @lc app=leetcode.cn id=459 lang=typescript
 * @lcpr version=30104
 *
 * [459] 重复的子字符串
 */

// @lc code=start
function repeatedSubstringPattern(s: string): boolean {
  // kmp （后面还要再看）
  function getNext(s: string): number[] {
    const next = new Array(s.length).fill(0);
    let j = 0;
    for (let i = 1; i < s.length; i++) {
      while (j > 0 && s[i] !== s[j]) {
        j = next[j - 1];
      }
      if (s[i] === s[j]) {
        j++;
      }
      next[i] = j;
    }
    return next;
  }
  const next = getNext(s);
  if (
    next[s.length - 1] !== 0 &&
    s.length % (s.length - next[s.length - 1]) === 0
  ) {
    return true;
  }
  return false;
}
// @lc code=end

/*
// @lcpr case=start
// "abab"\n
// @lcpr case=end

// @lcpr case=start
// "aba"\n
// @lcpr case=end

// @lcpr case=start
// "abcabcabcabc"\n
// @lcpr case=end

 */
