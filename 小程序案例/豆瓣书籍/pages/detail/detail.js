// pages/detail/detail.js
var request = require("../../utils/requests");
var star = require("../../utils/star");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      id: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ id: options.id });
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    request.getBookById(that.data.id, function (res) {
      var types = res.data;
      var rating = types.rating;
      rating.block = star.get_star(rating.average);
      res.data = types;
      console.log(res.data);
      that.setData({ bookInfo: res.data });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideToast();
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