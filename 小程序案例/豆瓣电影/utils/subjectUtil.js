function processSubject(subject) {
  // 名称
  var title = subject.title;

  //导演
  var directors = subject.directors;
  var directorStr = "";
  for (var index in directors) {
    directorStr = directorStr + directors[index].name + " / ";
  }
  if (directorStr != "") {
    directorStr = directorStr.substring(0, directorStr.length - 2);
  }
  // 主演
  var casts = subject.casts;
  var castStr = "";
  for (var index in casts) {
    castStr = castStr + casts[index].name + " / ";
  }
  if (castStr != "") {
    castStr = castStr.substring(0, castStr.length - 2);
  }
  // 剧情
  var genres = subject.genres;
  var genresStr = "";
  for (var index in genres) {
    genresStr = genresStr + genres[index] + " / ";
  }
  if (genresStr != "") {
    genresStr = genresStr.substring(0, genresStr.length - 2);
  }

  // 评分
  var average = subject.rating.average;
  average = average === 0 ? "暂无评分" : average

  // 年份
  var year = subject.year;
  
  var text = "名称: " + title + "\n导演: " + directorStr + "\n主演：" + castStr + "\n类型: " + genresStr + "\n 上映年份:" + year + "(中国大陆)" + "\n评分：  " + average;
  subject.text = text;

  var tt = "(" + title+")";
  subject.tt = tt;

var text1 = "评分：" + average + "\n导演：" + directorStr + "\n主演："+castStr;
  subject.text1 = text1;

}

function processSubjects(subjects) {
  for (var i = 0; i < subjects.length; i++) {
    var subject = subjects[i];
    this.processSubject(subject);
  }
}

module.exports = {
  processSubject: processSubject,
  processSubjects: processSubjects
}
