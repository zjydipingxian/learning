// pages/search/search.js
var request = require("../../utils/requests");
var star = require("../../utils/star");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    bookList: null,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeValue: function (e) {
    this.setData({ value: e.detail.value });
  },
  searchHandel: function (e) {  //搜索封装
    var that = this;
    if (that.data.value.replace(/\s/g, "")) {
      that.setData({
        bookList: null
      });
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      });
      request.searchBook({ q: that.data.value }, function (res) {
        var types = res.data.books;
        for (var idx in types) {
          var book = types[idx],
            rating = book.rating;
          rating.block = star.get_star(rating.average);
        }
        res.data.books = types;
        console.log(res.data.books);
        if (res.data.count == 0) { return; }
        that.setData({ bookList: res.data.books, count: that.data.count + res.data.count });
        wx.hideToast();
        console.log(res.data);
      })
    }
    else {
      wx.showToast({
        title: '请输入书名',
        icon: "loading"
      })
    }
  },
  toSearch: function () {
    var that = this;
    this.setData({ start: 0 });
    that.searchHandel();
  },
  lower: function (e) {
    console.log("已到低部");
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    var sobj = that.data.bookTag ? { tag: that.data.bookTag, start: that.data.count } : { q: that.data.value, start: that.data.count };
    request.searchBook(sobj, function (res) {
      var types = res.data.books;
      for (var i = 0; i < types.length; ++i) {
        var book = types[i];
        var rating = book.rating;

        rating.block = star.get_star(rating.average);
      }
      res.data.books = types;
      console.log(res.data.books);

      if (res.data.count == 0) { return; }
      that.setData({ bookList: that.data.bookList.concat(res.data.books), count: that.data.count + res.data.count });
      wx.hideToast();
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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