// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies : {},
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },
  //滚动加载数据
  onScrollLower: function (e) {
    var nextUrl = this.data.requestUrl +
      "?start=" + this  .data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    // 显示当面页面转圈圈
    wx.showNavigationBarLoading()
  },
  onPullDownRefresh: function (event) {
    wx.startPullDownRefresh()
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  //对应的数据请求
  processDoubanData: function (moviesDouban) {
    var movies = [];  //创建一个空的数组存储一些信息
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var average = subject.rating.average
      average = average === 0 ? '暂无评分' : average;
      var title = subject.title; //电影名字
      if (title.length >= 6) {  //电影名字过长处理
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars), //星星
        title: title,
        average: average, //评分
        coverageUrl: subject.images.large,  //海报
        movieId: subject.id   //存下id
      }
      movies.push(temp);  //添加数据  
    }
    var totalMovies = {}
     //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
     } else {
      totalMovies = movies;
      this.data.isEmpty = false;
     }
    this.setData({ movies: totalMovies});
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
  },
  onMovieTap: function (event){
    var category = event.currentTarget.dataset.category;
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "../movie-detail/movie-detail?id=" + movieId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})