const conversion = require('./conversion');


/** 64位转换 */
let a = conversion.encode('210', 64);
console.log(a);  // 值: 3i

let b = conversion.decode('3i', 32);
console.log(b);  // 值: 210


/** 64位浮点数转换（默认浮点数最大长度30） */
let c = conversion.encode('210.12', 64);
console.log(c);  // 值: 3i.7HxhWUkuK

let d = conversion.decode('3i.7HxhWUkuK', 64);
console.log(d);  // 值: 210.42


/** 其他进制转换 */
let e = conversion.encode('23', 2);
console.log(e);  // 值: 10111

let f = conversion.decode('10111', 2);
console.log(f);  // 值: 23


