// pages/home/home.js
import { getMultidata,getGoodsdata } from '../../net/home.js'
const types = ['pop','new','sell']
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
    },
    currentType: 'pop'
  },
  handleTabClick(event) {
    console.log(event)
  },
  onLoad: function (options) {
    //1. 请求轮播图
    this._getMultidata()
    // 2.请求商品数据
    // this._getGoodsData('pop')
    
    //给流行精选设置假数据
    this.setGoodsData('pop')
    this.setGoodsData('new')
    this.setGoodsData('sell')

  },

  // ---------------网络请求函数-------------
  _getMultidata(){
    getMultidata().then(res => {
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners: banners,
        recommends: recommends
      })
    })
  },
//流行精选商品
_getGoodsData(type){
  //1根据type 获取页码
  const page= this.data.goods[type].page+1;
  //2发送网络请求
  getGoodsdata(type,page).then(res =>{
    //2.1取出返回的数据
    const list=res.data.data.list;

    //2.2将数据设置到对应的type的list中
    const oldlist=this.data.goods[type].list;
    //...list 是将list的每个元素给添加到list中，可以用循环来操作
    // for(let item of list){
    //   oldlist.push(item);
    // }
    oldlist.push(...list);

    //2.3将数据设置到data的goods中
    //获取good中的list
    const typeKey = `goods.${type}.list`;
    //获取goods中的page
    const pageKey = `goods.${type}.page`;
    this.setData({
      [typeKey]:oldlist,
      [pageKey]:page
    })
  })
},

//提供假数据
setGoodsData(type){
  const oldlist=this.data.goods[type].list;
  for(var i= 0;i<30;i++){
    const item = { title: '烟花烫2019秋季新款时尚淑女中式绣花立领衬衫', image:'https://img13.360buyimg.com/n1/s350x449_jfs/t1/51877/11/5741/206670/5d36c899Ea1cab487/87559e3f76d477c3.jpg!cc_350x449.jpg',price:199.9,cfav:208};
    oldlist.push(item);
    //设置数据
    const listKey = `goods.${type}.list`;
    this.setData({
      [listKey]:oldlist
    })
  }
},
  // ---------------时间监听函数-------------

  handleTabclick(event){
    const index = event.detail.index;
    this.setData({
      currentType:types[index]
    })
  }

})