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
// 星星
function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

// 豆瓣数据请求
function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
  console.log(castsjoin)
}
function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}


function msgStr (msg) {
  //职业
  var professionsStr = "";
  for (var idx in msg) {
    professionsStr = professionsStr + msg[idx] + " / ";
  }
  if (professionsStr != "") {
    professionsStr = professionsStr.substring(0, professionsStr.length - 2);
  } else {
    professionsStr = "暂无信息"
  }

  //更多外文名

  var aka_enStr = "";
  for (var idx in msg) {
    
    aka_enStr = aka_enStr + msg[idx] + " / ";
  }
  
  if (aka_enStr != "") {
    aka_enStr = aka_enStr.substring(0, aka_enStr.length - 2);
  } else {
    aka_enStr = "暂无信息"
  }
  //更多中文名
  var akaStr = "";
  for (var idx in msg) {
    akaStr = akaStr + msg[idx] + " / ";
  }
  if (aka_enStr != "") {
    akaStr = akaStr.substring(0, akaStr.length - 2);
  } else {
    akaStr = "暂无信息"
  }

  

  return msg
}







module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  msgStr: msgStr,
}
