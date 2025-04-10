## 如何才能用二分法
1. 有序数组
2. 无重复元素（结果下标固定）；有重复元素（结果下标不固定）
区间一般两种： [left, right], [left, right)
## 循环不变量规则
区间的定义就是不变量，保持不变量，就是在while寻找中每一次边界的处理都要坚持根据区间的定义来操作，这就是循环不变量规则。
### 写法1
[left, right] 
- while(left <= right) (因为left == right 是有意义的)
- if(nums[middle] > target) right = middle - 1 （右边端点可达）
### 写法2
[left, right)
- while(left < right) (因为left == right 没有意义)
- if(nums[middle] > target) right = middle （右边端点不可达）
