export default {};
/*
 * @lc app=leetcode.cn id=151 lang=typescript
 * @lcpr version=30104
 *
 * [151] 反转字符串中的单词
 */

// @lc code=start
function reverseWords(s: string): string {
  // 1. 去除多余空格
  // 2. 反转整个字符串
  // 3. 反转每个单词
  // 4. 返回结果
  function delExtraSpace(s: string): string {
    // 不使用内置的split和join方法
    const arr: string[] = [];
    // 将字符串转换为字符数组
    for (let i = 0; i < s.length; i++) {
      arr.push(s[i]);
    }

    let slow = 0;
    // 去除字符串开头的空格
    let fast = 0;
    while (fast < arr.length && arr[fast] === " ") {
      fast++;
    }

    // 去除中间多余的空格
    for (; fast < arr.length; fast++) {
      // 如果当前字符不是空格，或者当前字符是空格但前一个字符不是空格，则保留
      if (arr[fast] !== " " || (arr[fast] === " " && arr[fast - 1] !== " ")) {
        arr[slow++] = arr[fast];
      }
    }

    // 去除末尾的空格
    if (slow > 0 && arr[slow - 1] === " ") {
      slow--;
    }

    // 构建结果字符串
    let result = arr.slice(0, slow).join("");

    return result;
  }

  function reverseString(s: string): string {
    let arr = s.split("");
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
    return arr.join("");
  }

  function reverseEachWord(s: string): string {
    let words = s.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = reverseString(words[i]);
    }
    return words.join(" ");
  }

  // 处理流程
  const trimmedStr = delExtraSpace(s);
  const reversedStr = reverseString(trimmedStr);
  const result = reverseEachWord(reversedStr);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// "the sky is blue"\n
// @lcpr case=end

// @lcpr case=start
// "  hello world  "\n
// @lcpr case=end

// @lcpr case=start
// "a good   example"\n
// @lcpr case=end

 */
