export default {};
/*
 * @lc app=leetcode.cn id=714 lang=typescript
 * @lcpr version=30200
 *
 * [714] 买卖股票的最佳时机含手续费
 */

// @lc code=start
function maxProfit(prices: number[], fee: number): number {
  // 贪心算法解决股票买卖问题
  // 局部最优：在最低点买入，在最高点卖出，然后减去手续费
  // 全局最优：在最低点买入，在最高点卖出，然后减去手续费
  let result = 0; // 最终利润
  let minPrice = prices[0]; // 初始化最低买入价格为第一天的价格

  for (let i = 1; i < prices.length; i++) {
    // 情况1：当前价格比之前的最低价格还低，更新最低买入价格
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }

    // 情况2：当前价格减去手续费后，仍然高于最低买入价格，可以考虑卖出获利
    if (prices[i] > minPrice + fee) {
      // 计算本次交易的利润并累加到结果中
      result += prices[i] - minPrice - fee;

      // 更新最低买入价格为当前价格减去手续费
      // 这是一个关键的贪心策略：如果后续价格继续上涨，可以当作没有卖出，
      // 而是在更高的价格卖出（相当于合并多次交易为一次）
      minPrice = prices[i] - fee;
    }
  }

  // 返回最终的最大利润
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1, 3, 2, 8, 4, 9]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1,3,7,5,10,3]\n3\n
// @lcpr case=end

 */
