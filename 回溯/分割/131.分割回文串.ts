export default {};
/*
 * @lc app=leetcode.cn id=131 lang=typescript
 * @lcpr version=30200
 *
 * [131] 分割回文串
 */

// @lc code=start
function partition(s: string): string[][] {
  const result: string[][] = [];
  const path: string[] = [];

  function backtracking(start: number) {
    if (start === s.length) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < s.length; i++) {
      const str = s.slice(start, i + 1);
      if (isPalindrome(str)) {
        path.push(str);
        backtracking(i + 1);
        path.pop();
      }
    }
  }
  function isPalindrome(str: string) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  backtracking(0);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// "aab"\n
// @lcpr case=end

// @lcpr case=start
// "a"\n
// @lcpr case=end

 */
