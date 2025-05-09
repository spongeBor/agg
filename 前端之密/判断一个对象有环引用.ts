export default {};
function cycleDetector(obj: any) {
  const arr = [obj];
  let flag = false;

  function cycle(o: any) {
    const keys = Object.keys(o);
    for (const key of keys) {
      const temp = o[key];
      if (typeof temp === 'object' && temp !== null) {
        if (arr.indexOf(temp) >= 0) {
          flag = true;
          return;
        }
        arr.push(temp);
        cycle(temp);
      }
    }
  }
}
