<template>
  <div>
    <router-view />
    <van-tabbar route active-color="#8d0000">
      <van-tabbar-item class="iconfont" v-for="item in title"
      :class="item.icon"
      :to='item.to'
      :key="item.name">
          <span>{{ item.name }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [
        {name:"首页",icon:'icon-yemian',to:'/tab/home'},
        {name:"专题",icon:'icon-zhuanti',to:'/tab/special'},
        {name:"分类",icon:'icon-leimupinleifenleileibie',to:'/tab/category'},
        {name:"购物车",icon:'icon-qicheqianlian-select',to:'/tab/cart'},
        {name:"我的",icon:'icon-yonghu',to:'/tab/user'},
           ],
    };
  },
};
</script>

<style lang="scss" scoped>

.iconfont{
  font-size: 18px;
  span{
    font-size: 14px;
  }
}
</style>
