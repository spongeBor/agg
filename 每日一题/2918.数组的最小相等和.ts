export default {};
/*
 * @lc app=leetcode.cn id=2918 lang=typescript
 * @lcpr version=30200
 *
 * [2918] 数组的最小相等和
 */

// @lc code=start
function minSum(nums1: number[], nums2: number[]): number {
  // 如果nums1和nums2的和不相等，则返回-1， 其中一个数组没有0
  // 如果nums1和nums2中都有0，则一定可以相等
  // 如果替换0，合最小的话，要把0换成1
  let sum1 = 0,
    sum2 = 0;
  let zero1 = 0,
    zero2 = 0;
  for (let i = 0; i < nums1.length; i++) {
    sum1 += nums1[i];
    if (nums1[i] === 0) {
      zero1++;
    }
  }
  for (let i = 0; i < nums2.length; i++) {
    sum2 += nums2[i];
    if (nums2[i] === 0) {
      zero2++;
    }
  }

  // 计算将0替换为1后的最小和
  let minSum1 = sum1 + zero1;
  let minSum2 = sum2 + zero2;

  // 如果一个数组没有0，它的和就固定了
  if (zero1 === 0 && minSum1 < minSum2) {
    return -1;
  }
  if (zero2 === 0 && minSum2 < minSum1) {
    return -1;
  }

  // 返回两个数组可能达到的最小相等和
  return Math.max(minSum1, minSum2);
}
// @lc code=end

/*
// @lcpr case=start
// [3,2,0,1,0]\n[6,5,0]\n
// @lcpr case=end

// @lcpr case=start
// [2,0,2,0]\n[1,4]\n
// @lcpr case=end

 */
