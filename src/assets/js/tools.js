var tools = {};
//注册全局js

/**
 * 日期转换(中文)
 * @param {*Date} date 传入时间对象 ymd symbol 年月日连接符号
 * @param {*Boolean} ymd  是否只显示年月日
 * @param {*String} symbol  年月日连接符号
 */
tools.formatTime = function(date, ymd, symbol, chinese) {
  var _symbol = "-";
  if (symbol) {
    _symbol = symbol;
  }
  var formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : "0" + n;
  };
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if (ymd) {
    if (chinese) {
      return year + "年" + month + "月" + day + "日";
    } else {
      return [year, month, day].map(formatNumber).join(_symbol);
    }
  } else {
    return (
      [year, month, day].map(formatNumber).join(_symbol) +
      " " +
      [hour, minute, second].map(formatNumber).join(":")
    );
  }
};
/**
 * 获取某月的第一天，最后一天(中文)
 * @param {*Date} date 传入时间对象 ymd symbol 年月日连接符号
 * @param {*String} symbol  年月日连接符号
 * @param {*String} type   'start,end' 默认start
 */
tools.getMouthDay = function(date, type, symbol) {
  var _symbol = "-";
  var _type = "start";
  if (symbol) {
    _symbol = symbol;
  }
  if (type) {
    _type = type;
  }
  var formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : "0" + n;
  };
  var year = date.getFullYear();
  var month = date.getMonth();
  var monthStartDate = new Date(year, month, 1);
  var monthEndDate = new Date(year, month + 1, 0);
  if (_type == "start") {
    var yy = monthStartDate.getFullYear();
    var mm = monthStartDate.getMonth() + 1;
    var dd = monthStartDate.getDate();
    return [yy, mm, dd].map(formatNumber).join(_symbol);
  } else {
    var YY = monthEndDate.getFullYear();
    var MM = monthEndDate.getMonth() + 1;
    var DD = monthEndDate.getDate();
    return [YY, MM, DD].map(formatNumber).join(_symbol);
  }
};
/**
 * 判断是否为数组
 * @param {*arr}  传入的数组
 */
tools.validArray = function(arr) {
  if (!Array.isArray) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  } else {
    return Array.isArray(arr);
  }
};
/**
 * 判断是否为对象
 * @param {*obj}  传入的对象
 */
tools.validObject = function(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
};
/**
 * 判断是否为数字
 * @param {*num}  传入的数字
 */
tools.validNumber = function(num) {
  if (num === "" || num == null) {
    return false;
  }
  if (!isNaN(num) && typeof num === "number") {
    return true;
  } else {
    return false;
  }
};
/**
 * 判断是否为对象
 * @param {*str}  传入的字符
 */
tools.validString = function(str) {
  return Object.prototype.toString.call(str) === "[object String]";
};
/**
 * 手机号码脱敏
 * @param {*phone}  传入的手机号
 */
tools.encryptPhone = function(phone) {
  if (!phone) {
    return "";
  }
  phone = String(phone);
  return phone.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
};
/**
 * 身份证号码脱敏
 * @param {*str}  cardNo 传入的身份证号码(必须是str类型)
 */
tools.encryptCardNo = function(cardNo) {
  if (!cardNo) {
    return "";
  }
  return cardNo.replace(/^(.{6})(?:\w+)(.{4})$/, "$1****$2");
};
/**
 * 银行帐号脱敏
 * @param {*str}  code 银行卡号
 */
tools.encryptBankCode = function(code) {
  if (!code) return "";
  code = String(code);
  return code.replace(/(\d{4})\d{8}(\d*)/, "$1********$2");
};
/**
 * 姓名脱敏
 * @param {*str}  name 姓名
 */
tools.encryptName = function(name) {
  if (!name) return "";
  return name.replace(
    /([\u4e00-\u9fa5]{1})([\u4e00-\u9fa5]*)$/,
    "$1" + "*".repeat(name.length - 1)
  );
};
/**
 * 邮箱脱敏
 * @param {*str} email 邮箱号码
 */
tools.encryptEmail = function(email) {
  if (!email) return "";
  let main = email.indexOf("@");
  return email.replace(/(\w+)@(\w+)\.com/, "*".repeat(main) + "@$2.com");
};
/**
 *  数字金额格式化, 每三位加','
 * @param {*num} num 金额
 */
tools.toThousandslsFilter = function(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
};
/**
 * 首字母大写
 * @param {*str}  str 传入的字符串
 */
tools.capitalize = function(str) {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * 身份证号码检测（精确型）
 * @param {*str}  val 传入的身份证号码
 */
tools.checkID = function(val) {
  var checkProv = function(val) {
    var pattern = /^[1-9][0-9]/;
    var provs = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
    };
    if (pattern.test(val)) {
      if (provs[val]) {
        return true;
      }
    }
    return false;
  };
  //检查生日
  var checkDate = function(val) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(val)) {
      var year = val.substring(0, 4);
      var month = val.substring(4, 6);
      var date = val.substring(6, 8);
      var date2 = new Date(year + "-" + month + "-" + date);
      if (date2 && date2.getMonth() == parseInt(month) - 1) {
        return true;
      }
    }
    return false;
  };
  //检查其他
  var checkCode = function(val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    var code = val.substring(17);
    if (p.test(val)) {
      var sum = 0;
      for (var i = 0; i < 17; i++) {
        sum += val[i] * factor[i];
      }
      if (parity[sum % 11] == code.toUpperCase()) {
        return true;
      }
    }
    return false;
  };
  if (checkCode(val)) {
    var date = val.substring(6, 14);
    if (checkDate(date)) {
      if (checkProv(val.substring(0, 2))) {
        return true;
      }
    }
  }
  return false;
};
/**
 * 身份证号码检测（简单型）
 * @param {*String}  val 传入的身份证号码
 */
tools.cardID = (val) => {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(val);
};

/**
 * 金额格式转换
 * @param {*number} number 传入金额
 * @param {*number} decimals  保留几位小数
 * @param {*string} dec_point  小数点符号
 * @param {*string} thousands_sep  千分位符号
 */
tools.number_format = (number, decimals, dec_point, thousands_sep) => {
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  var n = !isFinite(+number) ? 0 : +number;
  var prec = !isFinite(+decimals) ? 2 : Math.abs(decimals);
  var sep = typeof thousands_sep === "undefined" ? "," : thousands_sep;
  var dec = typeof dec_point === "undefined" ? "." : dec_point;
  var s = "";
  var toFixedFix = function(n, prec) {
    var k = Math.pow(10, prec);
    return "" + Math.ceil(n * k) / k;
  };

  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
};
/**
 * 只能输入数字,并保留两位小数
 * @param {*num} value  输入
 */
tools.validNumFixed = (value) => {
  if (!value) {
    return "";
  }
  value = String(value);
  var num = value.replace(/[^\d.]/g, ""); //清除数字和.以外的字符
  num = num.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  num = num
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
  if (num.indexOf(".") < 0 && num != "") {
    num = parseFloat(num);
  }
  return num;
};
/**
 * 只能输入字母
 * @param {*String} value  输入
 */
tools.validLetter = (value) => {
  var part = new RegExp("^[a-zA-Z]+$");
  return part.test(value);
};
/**
 * 去空
 * @param {*String} e 输入
 */
tools.trimvalid = (e) => {
  return e.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * 数组去重并且显示重复的元素
 * @param {*arr} arr 传入的数组
 */
tools.uniArr = (arr) => {
  var newArr = [];
  var count = [];
  for (var i = 0; i < arr.length; i++) {
    var type = true;
    for (var j = 0; j < newArr.length; j++) {
      if (newArr[j] == arr[i]) {
        type = false;
        count.push(arr[i]);
        break;
      }
    }
    if (type) {
      newArr.push(arr[i]);
    }
  }
  var newCount = Array.from(new Set(count));
  return {
    newArr: newArr,
    count: newCount,
  };
};
tools.debounce = function(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = [...arguments];
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};
//节流
tools.throttle = function(func, wait) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
};
//获取元素边界值
tools.getRect = function(elements) {
  var rect = elements.getBoundingClientRect();
  var clientTop = document.documentElement.clientTop;
  var clientLeft = document.documentElement.clientLeft;
  return {
    // 兼容ie多出的两个px
    top: rect.top - clientTop, // 距离顶部的位置
    bottom: rect.bottom - clientTop, // 距离顶部加上元素本身的高度就等于bottom的位置
    left: rect.left - clientLeft, // 距离左边的位置
    right: rect.right - clientLeft, // 距离右边的位置就是 距离左边的位置加上元素本身的宽度
  };
};
export default tools;
