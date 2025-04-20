/*
 * @lc app=leetcode.cn id=28 lang=typescript
 * @lcpr version=30104
 *
 * [28] 找出字符串中第一个匹配项的下标
 */

// @lc code=start
function strStr(haystack: string, needle: string): number {
  // kmp（后面还要再看）
  function getNext(needle: string): number[] {
    const next = new Array(needle.length).fill(0);
    let j = 0;
    for (let i = 1; i < needle.length; i++) {
      while (j > 0 && needle[i] !== needle[j]) {
        j = next[j - 1];
      }
      if (needle[i] === needle[j]) {
        j++;
      }
      next[i] = j;
    }
    return next;
  }

  const next = getNext(needle);
  let j = 0;
  for (let i = 0; i < haystack.length; i++) {
    while (j > 0 && haystack[i] !== needle[j]) {
      j = next[j - 1];
    }
    if (haystack[i] === needle[j]) {
      j++;
    }
    if (j === needle.length) {
      return i - needle.length + 1;
    }
  }
  return -1;
}
// @lc code=end

/*
// @lcpr case=start
// "sadbutsad"\n"sad"\n
// @lcpr case=end

// @lcpr case=start
// "leetcode"\n"leeto"\n
// @lcpr case=end

 */
