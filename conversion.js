/** 字符集常量 */
const __CHARS__ = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ+/';

/** 递归计算位值 */
function dealEncode(number, unit) {
  let remainder = number % unit;
  let digit = (number - remainder) / unit;
  let result = __CHARS__[remainder];
  if(Math.ceil(digit / unit) >= 1 ) {
    result = dealEncode(digit, unit) + result;
  }
  return result;
}
/** 反向递归计算 */
function dealDecode(number, unit) {;
  let result =  __CHARS__.indexOf(number.substring(0,1)) * Math.pow(unit, number.length -1);
  let nextNumber = number.substring(1, number.length);
  if(!!nextNumber) {
    result += dealDecode(nextNumber, unit);
  }
  return result;
}

/** 返回格式 */
function callbackReturn(code, msg) {
  return {
    code: code,
    msg: msg
  };
}

/** 进制校验 */
function unitValidation(type = 'encode',number, unit) {
  if(typeof unit != 'number')  {
    return callbackReturn(4, `错误: unit必须为number类型`);
  }
  if(unit > __CHARS__.length) {
    return callbackReturn(1, `错误: 禁止向超过${__CHARS__.length}进制进行转换操作`);
  }
  if(unit === 1 || unit === 0) {
    return callbackReturn(2, `错误: 禁止向${unit}进制进行转换操作`);
  }

  if(type === 'decode') {
    let count = number.length;
    while (count > 0) {
      if (__CHARS__.indexOf(number[count-1]) >= unit) {
        return callbackReturn(3, `错误: 当前输入值(${number})错误，请检查`);
      }
      count--
    }
  }


  return callbackReturn(0, '');
}

/** 处理小数点 */
function dealNumberPoint(number, unit, callback) {
  let numberArr = number.split('.');
  return `${callback(numberArr[0], unit)}.${callback(numberArr[1], unit)}`
}

/** 编码  */
function encode(number, unit = 10) {
  // 小数点处理
  if(number.indexOf('.') !== -1) {
    return dealNumberPoint(number, unit, encode);
  }
  // 执行校验
  let validate = unitValidation('encode', number,unit);
  if(validate.code !== 0) throw new Error(validate.msg);

  // 返回值
  return dealEncode(number, unit);
}

/** 解码 */
function decode(number, unit) {
  // 小数点处理
  if(number.indexOf('.') !== -1) {
    return dealNumberPoint(number, unit, decode);
  }
  // 执行校验
  let validate = unitValidation('decode', number, unit);
  if(validate.code !== 0) throw new Error(validate.msg);
  // 返回值
  return dealDecode(number, unit);
}


module.exports = {
  encode, decode
}
