const conversion = require('./conversion');


/** 64位转换 */
let a = conversion.encode('210', 64);
console.log(a);  // 值: 3i

let b = conversion.decode('3i', 64);
console.log(b);  // 值: 210


/** 64位浮点数转换 */
let c = conversion.encode('210.42', 64);
console.log(c);  // 值: 3i.G

let d = conversion.decode('3i.G', 64);
console.log(d);  // 值: 210.42


/** 其他进制转换 */
let e = conversion.encode('23', 2);
console.log(e);  // 值: 10111

let f = conversion.decode('10111', 2);
console.log(f);  // 值: 23


