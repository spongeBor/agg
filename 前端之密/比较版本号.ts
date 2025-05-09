export default {};
// 12.3.1
// 12.7.8
// 1.5.6-alpha.1
// 7.2.3-beta

function* walk(str: string) {
  let part = '';
  const terminal = ['.', '-'];
  for (let i = 0; i < str.length; i++) {
    if (terminal.includes(str[i])) {
      // 终结符
      yield part;
      part = '';
    } else {
      part += str[i];
    }
  }
  if (part) {
    yield part;
  }
}

const iterator = walk('1.5.6-alpha.1');
for (const item of iterator) {
  console.log(item);
}
