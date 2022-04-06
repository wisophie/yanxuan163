<template>
  <div class="home">
    <van-search
      placeholder="请输入搜索关键词"
      background="#fff"
      disabled
      @click="$router.push('/tab/home/searchPopup')"
    />
    <van-swipe class="my-swipe" indicator-color="deeppink">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img
          :src="item.image_url"
          style="display: block"
          alt=""
          class="swipe-img"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- tab栏 -->
    <van-grid :column-num="5">
      <van-grid-item
        :to="`/channel/${item.id}`"
        v-for="item in channel"
        :key="item.id"
        class="grid-item"
      >
        <img :src="item.icon_url" alt="" />
        <span>{{ item.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 品牌制造商 -->
    <div class="brand">
      <div class="head">品牌制造商直供</div>
      <ul>
        <li
          v-for="item in brandList"
          :key="item.id"
          @click="$router.push('/brand_detail/' + item.id)"
        >
          <img :src="item.pic_url" alt="" />
          <h4 class="t1">{{ item.name }}</h4>
          <p class="t2">{{ item.floor_price | money }}</p>
        </li>
      </ul>
    </div>
    <!-- 新品首发 -->
    <shop-list :data="newGoodsList" title="周一周四-新品首发"></shop-list>
    <!-- 人气推荐 -->
    <div class="hotRecommend">
      <div class="head">人气推荐</div>
      <van-card
        v-for="item in hotGoodsList"
        :key="item.id"
        tag="跳楼价!"
        :price="item.retail_price.toFixed(2)"
        :desc="item.goods_brief"
        :title="item.name"
        :thumb="item.list_pic_url"
      />
    </div>
    <!-- 专题精选 -->
    <div class="special">
      <div class="head">专题精选</div>
      <van-swipe :loop="false" :width="300" :show-indicators="false">
        <van-swipe-item class="ul" v-for="item in topicList" :key="item.id">
          <li>
            <img :src="item.item_pic_url" alt="" />
            <h3>
              {{ item.title }}<span>{{ item.price_info | money }}起</span>
            </h3>
            <div class="subtitle">{{ item.subtitle }}</div>
          </li>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- <div class="special">
      <div class="head">专题精选</div>
      <ul>
        <li v-for="item in topicList" :key="item.id">
          <img :src="item.item_pic_url" alt="" />
          <h3>
            {{ item.title }}<span>{{ item.price_info | money }}起</span>
          </h3>
          <div class="subtitle">{{ item.subtitle }}</div>
        </li>
      </ul>
    </div> -->
    <shop-list
      v-for="item in categoryList"
      :key="item.id"
      :data="item.goodsList"
      :title="item.name"
    ></shop-list>
    <transition name="van-slide-right">
      <router-view />
    </transition>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { getHome } from "network/api";
import ShopList from "@/components/common/ShopList.vue";
export default {
  components: { ShopList },
  data() {
    return {
      show: true,
      banner: [], //轮播图
      channel: [], //居家
      brandList: [], //品牌供应商
      newGoodsList: [], //新品首发
      hotGoodsList: [], //人气推荐
      topicList: [], //专题精选
      categoryList: [], //品类集合
    };
  },
  async created() {
    let {
      data: {
        banner,
        channel,
        brandList,
        newGoodsList,
        hotGoodsList,
        topicList,
        categoryList,
      },
    } = await getHome();
    console.log(banner);
    this.banner = banner.map(({ id, image_url }) => ({ id, image_url }));
    console.log(this.banner);
    this.channel = channel;
    this.brandList = brandList;
    this.newGoodsList = newGoodsList;
    this.hotGoodsList = hotGoodsList;
    this.topicList = topicList;
    this.categoryList = categoryList;
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/global-style.scss";
.home {
  padding-bottom: 150px;
  .van-search__content {
    border-radius: 15px;
  }
  .swipe-img {
    width: 100%;
  }
  .grid-item {
    color: #646566;
    img {
      width: 28px;
      height: 28px;
      // display:block!important;
    }
    span {
      margin-top: 8px;
    }
  }
  .head {
    text-align: center;
    line-height: 50px;
    font-size: 16px;
  }
  .brand {
    margin: 20px 0;
    background: #fff;

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 49%;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
        }

        .t1 {
          font-size: 14px;
          position: absolute;
          left: 10px;
          top: 10px;
        }
        .t2 {
          position: absolute;
          left: 10px;
          top: 40px;
          color: darkred;
        }
      }
    }
  }
  //人气推荐
  .hotRecommend {
    background: #fff;
    margin-top: 20px;
  }
  //专题精选
  .special {
    background: #fff;
    margin-top: 20px;
    .ul {
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      padding: 0 4px;
      li {
        margin-right: 4px;
        height: 270px;
        img {
          width: 300px;
          height: 200px;
        }
        h3 {
          font-size: 16px;
          margin: 15px 0;
          span {
            color: darkred;
          }
        }
        .subtitle {
          color: #666;
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  //新品推荐
  .newShop {
    background: #fff;
    ul {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      text-align: center;
      li {
        width: 49%;
        img {
          width: 100%;
        }
        .price {
          color: darkred;
          margin-top: 12px;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
// .slide-enter,.slide-leave-to{
//   left:100%
// }
// .slide-enter-active,.slide-leave-active{
//   transition: all .5s;
// }
// .slide-enter-to,.slide-leave{
//   left: 0;
// }
</style>
