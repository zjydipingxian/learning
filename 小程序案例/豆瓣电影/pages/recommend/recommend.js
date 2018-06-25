// pages/recommend/recommend.js
var subjectUtil = require('../../utils/subjectUtil.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovie();
  },
  detail: function (e) {
    app.detail(e);
  },
  loadMovie: function () {
    var page = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      data: {},
      method: 'GET',
      header: { 'content-type': 'application/xml' },
      success: function (res) {
        var subjects = res.data.subjects;
        subjectUtil.processSubjects(subjects);
        page.setData({ movies: subjects, hidden: true });
      }
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