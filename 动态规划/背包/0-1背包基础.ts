export default {};
//题目： 有n件物品和一个最多能背重量为w 的背包。第i件物品的重量是weight[i]，得到的价值是value[i] 。每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大。

function bag01(weight: number[], value: number[], bagSize: number) {
  // dp[i][j] 表示前i个物品在容量为j的背包中的最大价值
  // 这是我们的状态定义，i表示考虑前i个物品，j表示背包容量为j时的最大价值

  // dp[i-1][j] 表示不选第i个物品
  // 这种情况下，最大价值等于前i-1个物品在容量为j的背包中的最大价值

  // dp[i-1][j-weight[i-1]] + value[i-1] 表示选第i个物品
  // 前提是j-weight[i-1]>=0，即背包剩余容量能放下第i个物品
  // 这种情况下，最大价值等于"前i-1个物品在剩余容量j-weight[i-1]的最大价值"加上"当前物品的价值value[i-1]"

  // 状态转移方程: dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight[i-1]] + value[i-1])
  // 这个方程表示我们要在"不选"和"选"两种情况中取最大值

  // 初始化: dp[0][j] = 0，表示没有物品时，背包价值为0
  // dp[i][0] = 0，表示背包容量为0时，无法放入任何物品，价值为0

  // 创建二维数组dp，大小为(weight.length+1)*(bagSize+1)，初始值都为0
  // +1是因为我们需要考虑"0个物品"和"容量为0"的情况
  let dp = new Array(weight.length + 1)
    .fill(0)
    .map(() => new Array(bagSize + 1).fill(0));

  // 开始填充dp数组，i从1开始，表示考虑第1个物品
  for (let i = 1; i <= weight.length; i++) {
    // j从0开始，表示背包容量从0开始考虑
    for (let j = 0; j <= bagSize; j++) {
      // 如果当前背包容量j小于第i个物品的重量，那么无法选择该物品
      // 注意：weight[i-1]表示第i个物品的重量，因为数组索引从0开始
      if (j < weight[i - 1]) {
        // 此时只能选择不放入第i个物品，所以dp[i][j]等于dp[i-1][j]
        dp[i][j] = dp[i - 1][j];
      } else {
        // 如果背包容量足够，我们可以选择放入或不放入第i个物品
        // 取两种情况的最大值：
        // 1. 不放入第i个物品：dp[i-1][j]
        // 2. 放入第i个物品：dp[i-1][j-weight[i-1]] + value[i-1]
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - weight[i - 1]] + value[i - 1] // value 从0开始，dp从1开始，所以value[i-1]是第涂个物品
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
