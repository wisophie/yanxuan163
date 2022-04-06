<template>
  <div class="channel">
    <nav-bar :title="title"/>
    <ul class="cate-list">
      <li
        v-for="(item, index) in brotherCategory"
        :key="item.id"
        @click="cateClick(index, item.id)"
        :class="{ active: item.id == id }"
      >
        <span>{{ item.name }}</span>
        <i></i>
      </li>
    </ul>
    <header>
      <div>{{ msg }}</div>
    </header>
    <shop-list :data="goodsList" />
  </div>
</template>
<script>
import { getShopCategory, getShopList } from "network/api";
import ShopList from "../common/ShopList";
import NavBar from '../common/NavBar.vue';
export default {
  components: { ShopList, NavBar },
  data() {
    return {
      id: "",
      brotherCategory: [],
      title: "",
      msg: "",
      goodsList: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this._getShopCategory();
    this._getShopList();
  },
  mounted() {},
  methods: {
    //获取分类列表
    async _getShopCategory() {
      let {
        data: { brotherCategory, currentCategory },
      } = await getShopCategory(this.id);
      this.brotherCategory = brotherCategory;
      this.title = currentCategory.name;
      this.msg = currentCategory.front_name;
    },
    cateClick(index, id) {
      this.$router.push("/channel/" + id);
      this.id = id;
      this._getShopCategory();
      this._getShopList();
    },
    //获取分类商品信息
    async _getShopList() {
      let {
        data: { goodsList },
      } = await getShopList({ categoryId: this.id });
      this.goodsList = goodsList;
    },
  },
};
</script>

<style lang="scss" scoped>
.channel {
  width: 100%;
  overflow-x: hidden;
  .cate-list {
    height: 44px;
    width: 200%;
    display: flex;
    flex-wrap: nowrap;
    background: #fff;
    color: #666;
    li {
      width: 91px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      position: relative;
      &.active {
        color: #000;
        i {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 45px;
          height: 3px;
          border-radius: 15px;
          background: deeppink;
        }
      }
    }
  }
  header {
    text-align: center;
    h3 {
      font-size: 18px;
      height: 50px;
      line-height: 50px;
    }
    div {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>

