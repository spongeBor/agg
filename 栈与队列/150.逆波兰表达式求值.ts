/*
 * @lc app=leetcode.cn id=150 lang=typescript
 * @lcpr version=30104
 *
 * [150] 逆波兰表达式求值
 */

// @lc code=start
function evalRPN(tokens: string[]): number {
  //逆波兰表达式：是一种后缀表达式，所谓后缀就是指运算符写在后面
  //逆波兰表达式主要有以下两个优点：
  // 1. 去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + * 也可以依据次序计算出正确结果。
  // 2. 适合用栈操作运算：遇到数字则入栈；遇到运算符则取出栈顶两个数字进行计算，并将结果压入栈中。
  const stack: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "+") {
      const num2 = stack.pop();
      const num1 = stack.pop();
      stack.push(num1 + num2);
    } else if (tokens[i] === "-") {
      const num2 = stack.pop();
      const num1 = stack.pop();
      stack.push(num1 - num2);
    } else if (tokens[i] === "*") {
      const num2 = stack.pop();
      const num1 = stack.pop();
      stack.push(num1 * num2);
    } else if (tokens[i] === "/") {
      const num2 = stack.pop();
      const num1 = stack.pop();
      stack.push(Math.trunc(num1 / num2));
    } else {
      stack.push(Number(tokens[i]));
    }
  }
  return stack[0];
}
// @lc code=end

/*
// @lcpr case=start
// ["2","1","+","3","*"]\n
// @lcpr case=end

// @lcpr case=start
// ["4","13","5","/","+"]\n
// @lcpr case=end

// @lcpr case=start
// ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]\n
// @lcpr case=end

 */
