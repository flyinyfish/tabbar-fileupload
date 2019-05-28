// pages/admin/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTemp: 'tabBar',
    mainTemp: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.adminTabBar1()
  },

  selectNav: function (event) {
    var currentTab = event.currentTarget.dataset.index
    var tabBar = app.globalData.tabBar1
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false
      if (i == currentTab) {
        this.data.mainTemp = i
        tabBar.list[i].active = true
      }
    }
    this.setData({
      mainTemp: this.data.mainTemp,
      tabBar: app.globalData.tabBar1
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