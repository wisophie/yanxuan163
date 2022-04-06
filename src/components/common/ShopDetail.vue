<template>
  <div class="shopdetail">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="lightblue">
      <van-swipe-item v-for="item in shopDetail.gallery" :key="item.id">
        <img :src="item.img_url" alt="" width="100%" />
      </van-swipe-item>
    </van-swipe>
    <ul class="head">
      <li>30天无忧退货满</li>
      <li>48小时快速退费</li>
      <li>88元免邮费</li>
    </ul>
    <div class="shop">
      <h2>{{ shopDetail.name }}</h2>
      <div class="brief">{{ shopDetail.brief }}</div>
      <div class="price">{{ shopDetail.price | money }}</div>
    </div>
    <!-- 商品参数 -->
    <div class="content">
      <ul class="attribute">
        <li v-for="item in shopDetail.attribute" :key="item.name">
          <span class="left">{{ item.name }}</span>
          <span class="right van-ellipsis">{{ item.value }}</span>
        </li>
      </ul>
      <pre class="imgs" v-html="shopDetail.imgs"></pre>
    </div>
    <!-- 常见问题 -->
    <shop-title title="常见问题" />
    <ul class="issue">
      <li v-for="item in shopDetail.issue" :key="item.id">
        <h3>
          <i></i><span>{{ item.question }}</span>
        </h3>
        <div>{{ item.answer }}</div>
      </li>
    </ul>
    <!-- 大家都在看 -->
    <shop-title title="大家都在看" />
    <shop-list :data="goodsList" />
    <!-- 购物车框 -->
    <van-goods-action>
      <van-goods-action-icon
        :icon="isStar ? 'star' : 'star-o'"
        :text="isStar ? '已收藏' : '未收藏'"
        @click="isStar = !isStar"
      />
      <van-goods-action-icon
        @click="$router.push('/tab/cart')"
        icon="cart-o"
        text="购物车"
        :badge="goodsCount"
      />
      <van-goods-action-button type="danger" text="立即购买" />
      <van-goods-action-button
        @click="buyClick"
        type="warning"
        text="加入购物车"
      />
    </van-goods-action>
    <!-- 商品购买详情 -->
    <van-sku
      v-model="show"
      :sku="skuData.sku"
      :goods="skuData.goods"
      :quota="skuData.quota"
      :quota-used="skuData.quotaUsed"
      :properties="skuData.properties"
      :stock_num="skuData.stock_num"
      :goods-id="skuData.goodsId"
    >
      <!-- 自定义 sku actions -->
      <template #sku-actions="props">
        <div class="van-sku-actions">
          <!-- <van-button
            square
            size="large"
            type="warning"
            @click="onPointClicked"
          >
            积分兑换
          </van-button> -->
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button
            square
            size="large"
            type="danger"
            @click="addCartClick(props)"
          >
            添加购物车
          </van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>
<script>
import skuData from "./skuData";
import {
  getShopDetail,
  getshopRelated,
  addCart,
  getCartNumber,
} from "@/network/api";
import ShopTitle from "./shopTitle.vue";
import ShopList from "./ShopList.vue";
export default {
  components: { ShopTitle, ShopList },
  data() {
    return {
      skuData,
      show: false,
      shopDetail: {},
      goodsList: [], //商品推荐信息
      imgs: [], //图片描述
      isStar: false,
      goods: {},
      shopInfo: {},
      goodsCount: 0,
    };
  },
  async created() {
    this._getCartNumber();

    let id = this.$route.params.id;
    let {
      data: {
        info: {
          name, //商品名
          goods_brief, //商品描述
          retail_price, //商品单价
          goods_number, //商品库存
          goods_desc, //商品html介绍
          list_pic_url, //商品图片
          primary_pic_url, //产品图片
          primary_product_id, //产品id
        },
        issue,
        gallery,
        attribute,
        productList,
      },
    } = await getShopDetail(id);
    gallery =
      gallery.length != 0
        ? gallery
        : [
            { img_url: list_pic_url, id: 0 },
            { img_url: primary_pic_url, id: 1 },
          ];
    this.shopDetail = {
      id,
      name,
      brief: goods_brief,
      gallery,
      attribute,
      issue,
      imgs: goods_desc,
      price: retail_price,
      productImg: primary_pic_url,
      productId: productList[0].id,
    };
    this.skuData = {
      ...this.skuData,
      goods: { picture: primary_pic_url },
      sku: {
        ...this.skuData.sku,
        stock_num: goods_number,
        price: retail_price,
      },
      goodsId: primary_product_id,
    };
    let {
      data: { goodsList },
    } = await getshopRelated(id);
    this.goodsList = goodsList;
  },
  methods: {
    //获取购物车数量
    async _getCartNumber() {
      let {
        data: { cartTotal },
      } = await getCartNumber();
      this.goodsCount = cartTotal.goodsCount;
    },
    buyClick() {
      this.show = true;
    },
    //添加购物车的点击事件
    async addCartClick(val) {
      //发送添加购物车数据
      await addCart({
        goodsId: this.shopDetail.id,
        productId: this.shopDetail.productId,
        number: val.selectedNum,
      });
      this._getCartNumber();
      this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/img {
  width: 100%;
  display: block;
}
</style>

<style lang="scss" scoped>
.shopdetail {
  padding-bottom: 50px;
}
pre {
  margin-bottom: 20px;
}
.head {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 28px;
}
.shop {
  background: #fff;
  text-align: center;
  padding: 20px 0;
  h2,
  div {
    height: 40px;
    line-height: 40px;
  }
  h2 {
    font-size: 18px;
  }
  .brief {
    color: #666;
  }
  .price {
    color: darkred;
  }
}
//商品参数
.content {
  background: #fff;
  .attribute {
    li {
      height: 40px;
      line-height: 40px;
      background: #efefef;
      width: 95%;
      margin: 0px auto 10px;
      border-radius: 7px;
      display: flex;
    }
    .left {
      color: #666;
      font-size: 12px;
      width: 22%;
      text-align: right;
    }
    .right {
      font-size: 18px;
      width: 78%;
      padding-left: 15px;
    }
  }
}
//常见问题
.issue {
  padding: 0 18px;
  background: #fff;
  h3 {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    i {
      width: 4px;
      height: 4px;
      background: darkred;
      margin-right: 16px;
    }
  }
  div {
    padding: 0 0 10px 20px;
    font-size: 12px;
    color: #666;
    line-height: 16px;
  }
}
.newShop {
  background: #fff;
  margin: 0;
}
</style>
