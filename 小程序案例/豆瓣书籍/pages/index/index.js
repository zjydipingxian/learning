//index.js
//获取应用实例
var app = getApp()
var request = require("../../utils/requests.js");
var star = require("../../utils/star.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "../../images/banner1.jpg",
      "../../images/banner2.jpg"
    ],
    count: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    toRe: 0
  },
  toHandel: function(e) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    request.getBookList(that.data.toRe, "", function(res) {
      var types = res.data.books;
      for (var i in types) {
        var book = types[i], //书籍信息
          rating = book.rating; //评分

        rating.block = star.get_star(rating.average); //星星
      }
      res.data.books = types;
      if (res.data.count == 0) {
        return;
      }
      that.setData({
        bookList: res.data.books,
        count: that.data.count + res.data.count
      });
    })
  },
  //换一批
  toRefresh: function(e) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 8000
    })
    this.setData({
      toRe: star.toRefresh()
    });
    that.toHandel();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      toRe: star.toRefresh()
    });
    // console.log("加载");
    // console.log(that.data.toRe);
    request.getBookList(that.data.toRe, "", function(res) {
      var types = res.data.books;
      for (var i in types) {
        var book = types[i], //书籍信息
          rating = book.rating; //评分

        rating.block = star.get_star(rating.average); //星星
      }
      res.data.books = types;
      if (res.data.count == 0) {
        return;
      }
      that.setData({
        bookList: res.data.books,
        count: that.data.count + res.data.count
      });
    })
  },
  upper: function(e) {
    console.log("已到顶部");
  },
  lower: function(e) {
    console.log("已到低部");
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    request.getBookList(that.data.toRe, {
      start: that.data.count
    }, function(res) {
      var types = res.data.books;
      for (var i = 0; i < types.length; ++i) {
        var book = types[i];
        var rating = book.rating;
        rating.block = star.get_star(rating.average);
      }
      res.data.books = types;
      console.log(res.data.books);
      if (res.data.count == 0) {
        return;
      }
      that.setData({
        bookList: that.data.bookList.concat(res.data.books),
        count: that.data.count + res.data.count
      });
      wx.hideToast();
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})