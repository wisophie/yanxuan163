<template>
  <div class="category">
    <van-search
      placeholder="请输入搜索关键词"
      background="#fff"
      disabled
      @click="$router.push('/tab/category/popup')"
    />
    <div class="main">
      <!-- 侧边栏 -->
      <van-sidebar class="sidebar" v-model="active">
        <van-sidebar-item
          v-for="item in categoryList"
          :key="item.id"
          :title="item.name"
          @click="itemClick(item.id)"
        />
      </van-sidebar>
      <!-- 内容 -->
      <div class="content">
        <header>
          <img :src="currImg" alt="" />
          <div class="msg">{{ msg }}</div>
        </header>

        <div class="title">
          <span></span>
          <h2>{{ title }}分类</h2>
        </div>

        <van-grid :column-num="3">
          <van-grid-item
            v-for="item in subCategoryList"
            :key="item.id"
            class="grid-item"
          >
            <img :src="item.banner_url" alt="" width="28">
            <div>{{item.name}}</div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { getCate, getCurrentCate } from "@/network/api";
export default {
  data() {
    return {
      active: 0,
      categoryList: [],
      subCategoryList: [],
      currImg: "",
      msg: "",
      title: "",
    };
  },
  async created() {
    let {
      data: { categoryList },
    } = await getCate();
    this.categoryList = categoryList;
    this._getCurrentCate();
  },
  methods: {
    async _getCurrentCate(id = 1005000) {
      let {
        data: {
          currentCategory: { banner_url, front_name, name, subCategoryList },
        },
      } = await getCurrentCate(id);
      this.subCategoryList = subCategoryList;
      this.currImg = banner_url;
      this.msg = front_name;
      this.title = name;
    },
    //切换事件
    itemClick(id) {
      this._getCurrentCate(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  position: relative;
  .van-search__content {
    border-radius: 15px;
  }
  .main {
    display: flex;
    .sidebar {
      height: calc(100vh - 104px);
      background: #f7f8fa;
      width: 20%;
    }
    //主要内容
    .content {
      width: 80%;
      background: #fff;
      header {
        width: 95%;
        margin: 0 auto;
        position: relative;
        img {
          width: 100%;
          height: 140px;
          box-shadow: 0 0 6px #000;
          border-radius: 5px;
          filter: brightness(0.5);
        }
        .msg {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          text-align: center;
          transform: translateY(-50%);
          color: #fff;
        }
      }
      .title {
        height: 50px;
        position: relative;
        text-align: center;
        h2,
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        h2 {
          z-index: 99;
          background: #fff;
          width: 100px;
          font-size: 18px;
        }
        span {
          width: 50%;
          height: 2px;
          background: #ccc;
        }
      }
      .grid-item{
        div{
          color:#646566;
          font-size: 12px;
          margin-top: 8px;
        }
      }
    }
  }
  //侧边栏
}
</style>
<style lang="scss" scoped>
.slide-enter,.slide-leave-to{
  left:100%
}
.slide-enter-active,.slide-leave-active{
  transition: all .5s;
}
.slide-enter-to,.slide-leave{
  left: 0;
}
</style>