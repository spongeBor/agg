export default {};
/*
 * @lc app=leetcode.cn id=135 lang=typescript
 * @lcpr version=30200
 *
 * [135] 分发糖果
 */

// @lc code=start
function candy(ratings: number[]): number {
  // 此时局部最优：只要右边评分比左边大，右边的孩子就多一个糖果，
  // 全局最优：相邻的孩子中，评分高的右孩子获得比左边孩子更多的糖果
  const candyVec = new Array(ratings.length).fill(1);
  // 从左到右遍历
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candyVec[i] = candyVec[i - 1] + 1;
    }
  }
  // 局部最优：只要左边评分比右边大，左边的孩子就多一个糖果，
  // 全局最优：相邻的孩子中，评分高的左孩子获得比右边孩子更多的糖果
  // 从右到左遍历
  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candyVec[i] = Math.max(candyVec[i], candyVec[i + 1] + 1);
    }
  }
  // 统计结果
  let result = 0;
  for (let i = 0; i < candyVec.length; i++) {
    result += candyVec[i];
  }
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,0,2]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,2]\n
// @lcpr case=end

 */
