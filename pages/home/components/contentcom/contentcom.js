// pages/home/components/contentcom/contentcom.js
const app = getApp()
Component({
  behaviors: [],
  properties: { //组件对外要开发的属性
    // positions: Object
  },
  data: { // 私有数据，可用于模板渲染
    extraClasses: 'page-transition page-moved'
  },
  lifetimes: {  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    created() {
      // 在组件实例刚刚被创建时执行
    },
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      // 在组件在视图层布局完成后执行
      this.setData({
        extraClasses: 'page-transition'
      })
    },
    moved() {
      // 在组件实例被移动到节点树另一个位置时执行
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
    error() {
      // 每当组件方法抛出错误时执行
    }
  },
  pageLifetimes: {  // 组件所在页面的生命周期函数
    show() {
      
    },
    hide() {},
    resize() {},
  },
  methods: {
    goAdminNav: function () {
      // wx.navigateTo({
      //   url: '/pages/admin/index/index'
      // })
      console.log(0)
      wx.redirectTo({
        url: '/pages/admin/index/index'
      })
    }
  }
})