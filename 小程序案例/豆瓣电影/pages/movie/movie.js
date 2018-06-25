// pages/movie/movie.js
var subjectUtil = require('../../utils/subjectUtil.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // text:"这是一个页面"
    imgUrls: [
      '/images/001.jpg',
      '/images/002.jpg',
      '/images/003.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    movies: [],
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.loadMovie();
  },
  detail: function (e) {
    app.detail(e);
  },
  loadMovie : function() {
    var page = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters',
      data: {},
      method: 'GET',
      header: { 'content-type': 'application/xml' },
      success: function (res) {
        
        var subjects = res.data.subjects;
        console.log(subjects)
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