const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function regexReplace(str) {
  if (!str) {
    return null;
  }
  if (arguments.length == 1) return str;
  for (var i = 1; i < arguments.length + 1; i++)
    str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
  return str;
}

function json2Form(json) {

  var str = [];

  for (var p
    in json) {

    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));

  }

  return str.join("&");

}

module.exports = {
  formatTime: formatTime,
  regexReplace: regexReplace,
  json2Form: json2Form
}
