// pages/list/list.js
var request = require("../../utils/requests");
var star = require("../../utils/star");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: null,
    bookTag: "",
    count: 0
  },
  upper: function (e) {
    console.log("已到顶部");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.tag) {
      that.setData({ bookTag: options.tag })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 8000
    })
    if (that.data.bookTag) {
      request.searchBook({ tag: that.data.bookTag }, function (res) {
        var types = res.data.books;
        for (var i = 0; i < types.length; ++i) {
          var book = types[i];
          var rating = book.rating;

          rating.block = star.get_star(rating.average);
        }
        res.data.books = types;
        if (res.data.count == 0) { return; }
        that.setData({ bookList: res.data.books, count: that.data.count + res.data.count });
        console.log(res.data);
        wx.hideToast();
      })
    } else {
      wx.hideToast();
    }
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
  onPullDownRefresh: function (e) {
    wx.startPullDownRefresh()
    console.log("下拉事件");
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