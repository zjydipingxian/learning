// pages/movies/movies.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 正在热映
    var inTheatersUrl = app.globalData.doubanBase +
 "/v2/movie/in_theaters" + "?start=0&count=3";
    //即将上映
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    //top250  
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣Top250");
  },
  // 数据申请
  getMovieListData: function (url, settedKey , categoryTitle) {
    var that = this;
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      }
    })
  },
  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [];  //创建一个空的数组存储一些信息
    for (var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var average = subject.rating.average
      var yrid = subject.casts;
      
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
    var readyData = {};
    
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },
  // 更多的类型
  onMoreTap: function (event) {
    console.log(event)
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },
  
  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    }
    )
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onBindBlur: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },
  //详情页
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "movie-detail/movie-detail?id=" + movieId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // 更多
  onReady: function () {
      
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