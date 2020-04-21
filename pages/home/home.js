// pages/home/home.js
import { getMultidata } from '../../net/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles:['流行','新款','精选'],
    goods:{
      pop:{page:0,list:[]},
      new:{page:0,list:[]},
      sell:{page:0,list:[]}
    }
  },
  handleTabClick(event) {
    console.log(event)
  },
  onLoad: function (options) {
    getMultidata().then(res => {
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners: banners,
        recommends: recommends
      })
    })
  },
  handleTabclick(event){
    const index = event.detail.index;
    console.log(index)
  }

})