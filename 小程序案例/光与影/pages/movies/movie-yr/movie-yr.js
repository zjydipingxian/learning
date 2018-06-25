// pages/movies/movie-yr/-movie-yr.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var YrUrl = app.globalData.doubanBase +
      "/v2/movie/celebrity/" + options.yrId;
    util.http(YrUrl, this.processDoubanData)
  },
  processDoubanData : function (data) {
    var photos= []
    for (var idx in data.photos.length){
      console.log(idx)
    }
    if (!data) {
      return ;
    }
    if (data.summary === ""){
      data.summary = "暂无信息"
    }
    var movie = {
      gender: data.gender,
      constellation: data.constellation,
      birthday: data.birthday,
      born_place: data.born_place,
      professions: util.msgStr(data.professions),
      aka_en: util.msgStr(data.aka_en[0]),
      aka: util.msgStr(data.aka),
      name: data.name,
      name_en: data.name_en,
      yrUrl: data.avatars.large,
      summary : data.summary,
      photos : photos
    }
    this.setData({ movie: movie });
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