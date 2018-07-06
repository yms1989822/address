var utils = require('../../utils/util');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 保存地址
   */
  addrFormSubmit: function(e){

    if (!e.detail.value.name){
      wx.showModal({
        title: '提示',
        content: '请填写正确的收件人',
        showCancel: false,
        confirmColor: '#18AD18'
      }) 
      return;
    }

    if (!(/^1[34578]\d{9}$/.test(e.detail.value.phone))){
      
        wx.showModal({
        title: '提示',
        content: '请填写正确的联系电话',
        showCancel: false,
        confirmColor: '#18AD18'
      })
      return;
    }

    if (e.detail.value.addr.length==0) {
      wx.showModal({
        title: '提示',
        content: '请选择所在地区',
        showCancel: false,
        confirmColor: '#18AD18'
      })
      return;
    }

    if (!e.detail.value.addrRes) {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false,
        confirmColor: '#18AD18'
      })
      return;
    }


    var isDefaultSave = 0;
    if (e.detail.value.isDefault){
      isDefaultSave = 1;
    }

    var userid = app.data.userid;

    var postData = utils.regexReplace(app.data.saveOrUpdateAddress, userid, isDefaultSave, e.detail.value.phone, e.detail.value.addr[0], e.detail.value.addr[1], e.detail.value.addr[2], e.detail.value.addrRes, e.detail.value.phone, e.detail.value.name, e.detail.value.id);
    wx.showLoading({
      title: '正在保存',
    })
    wx.request({
      url: app.data.webUrl + "useraddress_service/saveOrUpdateUserAddr.do",
      data: {"json": postData},
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },      
      success: function (res) {
        wx.hideLoading();
        if(res.data.code=="200"){
          wx.showToast({
            title: res.data.result,
            duration: 2000          
          })
          wx.navigateBack({ changed: true });  

       }else{
          wx.showModal({
            title: '提示',
            content: '添加失败',
            showCancel: false,
            confirmColor: '#18AD18'
          })
          return;
       }
      },
      fail: function (){
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '添加失败',
          showCancel: false,
          confirmColor: '#18AD18'
        })
        return;
      }
    })  
  },

  /**
   * 区域选择事件
   */
  bindRegionChange: function(e){
    var that = this;
    that.setData({
      showRegion: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
    });
  },

  switchChangeEvent: function(e){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      var that = this;
      wx.showLoading({
        title: '正在加载',
      })
      wx.request({
        url: app.data.webUrl + "useraddress_service/queryAddressById.do",
        data: { "id": options.id },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.code == "200") {
            var data = res.data.result;
            data = JSON.parse(data);
            var isdefault = data.isdefault;
            if (isdefault == 1) {
              isdefault = true;
            } else {
              isdefault = false;
            }

            var id = "";
            if (data.id) {
              id = data.id;
            }
            that.setData({
              id: id,
              userid: data.userid,
              name: data.contact,
              phone: data.mobile,
              showRegion: data.province + data.city + data.county,
              addrRes: data.address,
              isDefault: isdefault,
              region: [data.province, data.city, data.county]

            });
          }else{
            wx.showModal({
              title: '提示',
              content: '获取信息失败',
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
            content: '获取信息失败',
            showCancel: false,
            confirmColor: '#18AD18'
          })
          return;
        }
      }) 
    }else{
      this.setData({
        region: []

      });
    }
    
    
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