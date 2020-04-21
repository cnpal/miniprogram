// components/m-tab-control/tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    habdleItemClick(event){
      // 取出index
      var index = event.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      })
      // 通知页面内部点击事件
      this.triggerEvent('tabclick',{index:this.data.currentIndex},{})
    }
  }
})
