# 一

使用字面量对进行属性赋值你确定你了解吗？让我们看这样一个例子：

```ts
const gf = { 1: 1234, 2: 234432, '1': 23432, adb: 43242 };
console.log(gf);
// output: {'1': 23432, '2':234432, 'adb': 43242}
// 结论：对象的数字Key,都会被转换成String类型的Key
```

再看另外一个例子：

```ts
cosnt gf = {'temper': 123213, 'happy': 'rewrwe', 'eat': 'wwerw'};
console.log(gf); //output: {'temper': 123213, 'happy': 'rewrwe', 'eat': 'wwerw'}
const gf = {'abc': 43242, 1: 14324, 'abd': 'fdsa', 234: 'erwq'};
console.log(gf); // output: {'1': 14324, '234': 'erwq' 'abc': 43242, 'abd': 'fdsa'};
```

看出什么问题了吗？  
在对没有能转成数字类型的字符串 key 进行属性赋值时，对象会保证定义时属性顺序；但对有能转成数字类型的字符串 key 进行的属性赋值时，对象会把数字类的 key 按升序排到对象的前面。

### v8 引擎对象存储策略

- v8 中的对象存储分为**排序属性**: elements 和**常规属性**: properties
- 在 elements 对象中会按照顺序保存排序属性；在 properties 对象中会按照创建时的顺序保存常规属性。

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b95700e4cb974ca19153b9e528915f98~tplv-k3u1fbpfcp-watermark.image?" alt="test.png"  /></p>

- elements 默认采用的是连续的存储结构，利用空间换时间的特性可以直接以下标进行访问，类似于数组；但如果是稀疏的就会优化时 hash 表进行存储，对用户来说是无感知的。
- properties 默认有内置属性，但只有 10 个，这 10 个存满后，就会往 properties 对象里存储；properties 默认的数组结构是链表，当数据量上升到某个值时，会优化成 hash 表。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cd99d4b653343b5b540431b03aaa988~tplv-k3u1fbpfcp-watermark.image?" alt="test2.png"  /></p>

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26b2528d632a4b379f7c5f82f912b7f8~tplv-k3u1fbpfcp-watermark.image?" alt="test3.png"  /></p>

```ts
function Foo(elementNum, propertyNum) {
  // 添加可索引属性
  for (let i = 0; i < elementNum; i++) {
    this[i] = `ele${i}`;
  }
  for (let i = 0; i < propertyNum; i++) {
    const ppt = `ppt${i}`;
    this[ppt] = ppt;
  }
}
const bar = new Foo(10, 10);
```
