export default {};
//题目： 有n件物品和一个最多能背重量为w 的背包。第i件物品的重量是weight[i]，得到的价值是value[i] 。每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大。

function bag01(weight: number[], value: number[], bagSize: number) {
  // dp[i][j] 表示前i个物品在容量为j的背包中的最大价值
  // dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight[i]] + value[i])
  // dp[0][j] = 0
  // dp[i][0] = 0
  let dp = new Array(weight.length + 1)
    .fill(0)
    .map(() => new Array(bagSize + 1).fill(0));
  for (let i = 1; i <= weight.length; i++) {
    for (let j = 0; j <= bagSize; j++) {
      if (j < weight[i - 1]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - weight[i - 1]] + value[i - 1]
        );
      }
    }
  }

  // 测试代码
  console.log("DP表格:");
  for (let i = 0; i <= weight.length; i++) {
    console.log(dp[i]);
  }

  // 输出选择的物品
  let i = weight.length;
  let j = bagSize;
  let selectedItems = [];
  while (i > 0 && j > 0) {
    if (dp[i][j] !== dp[i - 1][j]) {
      selectedItems.push(i - 1);
      j -= weight[i - 1];
    }
    i--;
  }
  console.log("选择的物品索引:", selectedItems.reverse());

  return dp[weight.length][bagSize];
}

// 测试用例
const weights = [1, 3, 4];
const values = [15, 20, 30];
const bagSize = 4;
console.log("最大价值:", bag01(weights, values, bagSize)); // 结果是35，选择了物品0（价值15，重量1）和物品1（价值20，重量3），总重量为4，总价值为35
