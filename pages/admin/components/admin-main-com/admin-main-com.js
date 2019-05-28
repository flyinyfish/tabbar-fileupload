// pages/admin/components/admin-main-com/admin-main-com.js
const app = getApp()
Component({
  behaviors: [],
  properties: { //组件对外要开发的属性
    // positions: Object
  },
  data: { // 私有数据，可用于模板渲染
    extraClasses: 'page-transition page-moved',
    images: []
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
    hide() {

    },
    resize() {

    },
  },
  methods: {
    goHomeNav: function () {
      wx.redirectTo({
        url: '/pages/home/index/index'
      })
    },
    chooseImage(e) {
      wx.chooseImage({
        count: 3,   //最多可以选择的图片张数
        sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
        sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
        success: res => {
          this.data.images = this.data.images.concat(res.tempFilePaths)
          // 限制最多只能留下3张照片
          //this.data.images = images.length <= 3 ? images : images.slice(0, 3)   //最多可以选择的图片张数
          this.setData({
            images: this.data.images
          })
        }
      })
    },
    removeImage(e) {
      const idx = e.target.dataset.idx
      this.data.images.splice(idx, 1)
      this.setData({
        images: this.data.images
      })
    },
    handleImagePreview(e) {
      const idx = e.target.dataset.idx
      const images = this.data.images
      wx.previewImage({
        current: images[idx],  //当前预览的图片
        urls: images,  //所有要预览的图片
      })
    },
    submitForm(e) {
      const title = this.data.title
      const content = this.data.content

      if (title && content) {
        wx.showLoading({
          title: '正在创建...',
          mask: true
        })

        // 将选择的图片组成一个Promise数组，准备进行并行上传
        const arr = this.data.images.map(path => {
          return wxUploadFile({
            url: config.urls.question + '/image/upload',
            filePath: path,
            name: 'qimg',
          })
        })

        // 开始并行上传图片
        Promise.all(arr).then(res => {
          // 上传成功，获取这些图片在服务器上的地址，组成一个数组
          return res.map(item => JSON.parse(item.data).url)
        }).catch(err => {
          console.log(">>>> upload images error:", err)
        }).then(urls => {
          // 调用保存问题的后端接口
          return createQuestion({
            title: title,
            content: content,
            images: urls
          })
        }).then(res => {
          // 保存问题成功，返回上一页（通常是一个问题列表页）
          const pages = getCurrentPages();
          const currPage = pages[pages.length - 1];
          const prevPage = pages[pages.length - 2];

          // 将新创建的问题，添加到前一页（问题列表页）第一行
          prevPage.data.questions.unshift(res)
          $digest(prevPage)

          wx.navigateBack()
        }).catch(err => {
          console.log(">>>> create question error:", err)
        }).then(() => {
          wx.hideLoading()
        })
      }
    },
  }
})