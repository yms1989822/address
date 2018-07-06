const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 列表选中事件，需要的可以打开
   */
  // selectAddrEvent: function(e){
  //   var editIndex = e.currentTarget.dataset.index;
  //   var data = this.data.addressList[editIndex];
  //   data = JSON.stringify(data);
  //   data = '[' + data + ']';
  //   data = JSON.parse(data);

  //   let pages = getCurrentPages();//当前页面
  //   let prevPage = pages[pages.length - 2];//上一页面
  //   prevPage.setData({//直接给上移页面赋值
  //     addressList: data
  //   });
  //   wx.navigateBack({//返回
  //     delta: 1
  //   })
  // },

  /**
   * 添加收货地址按钮
   */
    addAddrEvent: function(){
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },

  /**
   * 编辑收货地址按钮
   */
  editEvent: function(e){
    var editIndex = e.currentTarget.dataset.index;
    var id = this.data.addressList[editIndex].id
    wx.navigateTo({ url: '/pages/addAddress/addAddress?id=' + id }) 
  },

  /**
   * 删除收货地址按钮
   */
  delEvent: function(e){
    var that = this;
    var delIndex = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确认删除地址？',
      showCancel: true,
      confirmColor: '#18AD18',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除',
          })
          wx.request({
            url: app.data.webUrl + "useraddress_service/delete.do",
            data: { "id": that.data.addressList[delIndex].id },
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              wx.hideLoading();
              if (res.statusCode == '200') {
                var addressList = that.data.addressList.splice(delIndex, 1);
                that.setData({
                  addressList: that.data.addressList

                });
              }else{
                wx.showModal({
                  title: '提示',
                  content: '获取数据失败',
                  showCancel: false,
                  confirmColor: '#18AD18'
                })
                return;
              }
            },
            fail:function(){
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '获取数据失败',
                showCancel: false,
                confirmColor: '#18AD18'
              })
              return;
            }
          }) 
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    var userid = app.data.userid;

    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.data.webUrl + "useraddress_service/queryUserAddressList.do",
      data: { "userid": userid },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode == '200') {
          var data = res.data.result;
          data = JSON.parse(data);
          that.setData({
            addressList: data
          });
        }else{
          wx.showModal({
            title: '提示',
            content: '获取数据失败',
            showCancel: false,
            confirmColor: '#18AD18'
          })
          return;
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '获取数据失败',
          showCancel: false,
          confirmColor: '#18AD18'
        })
        return;
      }
    }) 
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