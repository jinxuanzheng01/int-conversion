/** 字符集常量 */
const __CHARS__ = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ+/';

/** 10进制转其他 */
function dealEncode(number, unit) {
  let remainder = number % unit;
  let digit = (number - remainder) / unit;
  let result = __CHARS__[remainder];
  if(Math.ceil(digit / unit) >= 1 ) {
    result = dealEncode(digit, unit) + result;
  }
  return result;
}

/** 其他转10进制 */
function dealDecode(number, unit) {;
  let result =  __CHARS__.indexOf(number.substring(0,1)) * Math.pow(unit, number.length -1);
  let nextNumber = number.substring(1, number.length);
  if(!!nextNumber.toString()) {
    result += dealDecode(nextNumber, unit);
  }
  return result;
}

/** 10进制浮点数转其他 */
function dealEncodePoint(number, unit, limit) {
  let curremtNumber = number * unit;
  let result = '';
  if(curremtNumber != 0 && limit > 0) {
    let curremtNumber2String = curremtNumber.toString();
    let integer =  curremtNumber2String.split('.')[0];
    result = __CHARS__[curremtNumber2String.split('.')[0]] + dealEncodePoint(curremtNumber - integer, unit, --limit);
  }
  return result;
}

/** 其他浮点数转10进制 */
function dealDecodePoint(number, unit, count = 2) {
  let result =  __CHARS__.indexOf(number.substring(0,1)) * (unit /  Math.pow(unit, count));
  let nextNumber = number.substring(1, number.length);
  if(!!nextNumber) {
    result += dealDecodePoint(nextNumber, unit, ++count);
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

/** 编码  */
function encode(number, unit = 10) {
  // 小数点处理
  if(number.indexOf('.') !== -1) {
    return `${encode(number.split('.')[0], unit)}.${dealEncodePoint('0.' + number.split('.')[1], unit, 30)}`;
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
    return `${decode(number.split('.')[0], unit) + dealDecodePoint(number.split('.')[1], unit)}`;
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
