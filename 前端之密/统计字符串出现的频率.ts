export default {};
const strr = 'fgadfsakrlewquiorewq';
const result = strr.split('').reduce((a: any, b: any) => {
  a[b]++ || (a[b] = 1);
  return a;
}, {});
console.log(result);
