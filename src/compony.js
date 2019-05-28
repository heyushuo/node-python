var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')
var movies = []
var requstMovie = function(url) {
  request(url, function(error, response, body) {
    //res.statusCode 为200则表示链接成功
    if (error === null && response.statusCode === 200) {
      console.log('链接成功')
      //使用cheerio来解析body（网页内容），提取我们想要的信息
      var e = cheerio.load(body);
      // //通过分析网页结构，我们发现豆瓣每部电影都通过item属性隔开
      var movieDiv = e('.m_srchList tr')
      // //通过for循环来提取每部电影里的信息
      for (let i = 0; i < movieDiv.length; i++) {
        //takeMovie函数能提取电影名称、评分和封面
        let movieInfo = takeMovie(movieDiv[i])
        //将提取到的电影放入数组
        movies.push(movieInfo)
      }
      console.log(movies);
    }
  })
}
var takeMovie = function(div) {
  var e = cheerio.load(div)
  //将类初始化
  var m = {
    name: "",
    phone: ""
  }
  m.name = e('.ma_h1').text()
  m.phone = e('.m-t-xs').eq(1).find(".m-l").text()
  return m
}
var arr = ["河北旅游", "天津旅游", "海南旅游", "广西旅游", "山东旅游"]
for (let i = 0; i < arr.length; i++) {
  const ele = arr[i];
  // 'https://www.qichacha.com/search?key=%E6%B5%99%E6%B1%9F%E6%97%85%E6%B8%B8'
  var url = "https://www.qichacha.com/search?key=" + encodeURIComponent(ele);
  console.log(url);
  requstMovie(url)
}