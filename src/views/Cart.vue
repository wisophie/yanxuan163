<template>
  <div class="cart">
    <ul class="head">
      <li>30天无忧退货满</li>
      <li>48小时快速退费</li>
      <li>88元免邮费</li>
    </ul>
    <!-- 商品栏 -->
    <ul class="goods">
      <li v-for="item in cartList" :key="item.id">
        <van-checkbox
          v-model="item.checked"
          @change="switchGoods(item.product_id, item.checked)"
        ></van-checkbox>
        <van-card
          :num="item.number"
          :price="item.retail_price.toFixed(2)"
          :desc="item.goods_name"
          :thumb="item.list_pic_url"
        >
          <template #footer>
            <transition name="van-slide-down">
              <van-stepper
                v-show="show"
                v-model="item.number"
                @change="updateGoods(item)"
              />
            </transition>
          </template>
        </van-card>
      </li>
    </ul>
    <!-- 提交订单 -->
    <van-submit-bar :price="goodsTotal" button-text="下单" @submit="onSubmit">
      <van-checkbox v-model="allChecked">全选</van-checkbox>
      <template #tip class="edit">
        修改商品购买数量
        <van-button
          size="mini"
          plain
          :type="color"
          @click="onClickEditAddress"
          >{{ tip }}</van-button
        >
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { getCartList, addGoodsNumber, switchGoodsChecked } from "@/network/api";
export default {
  data() {
    return {
      checked: true,
      cartList: [],
      show: false,
      tip: "编辑",
      color: "info",
    };
  },
  async created() {
    //获取商品数据
    let { data } = await getCartList();
    this.cartList = data.cartList;
  },
  computed: {
    goodsTotal() {
      return (
        this.cartList.reduce((sum, item) => {
          return (sum += item.checked ? item.retail_price * item.number : 0);
        }, 0) * 100
      );
    },
    allChecked: {
      get() {
        return this.cartList.every((item) => item.checked != false);
      },
      set(val) {
        this.cartList.forEach((item) => (item.checked = val));
      },
    },
  },
  methods: {
    //更新商品数量
    updateGoods(data) {
      addGoodsNumber({
        goodsId: data.goods_id,
        id: data.id,
        number: data.number,
        productId: data.product_id,
      });
    },
    onSubmit(val) {
      // this.$toast('打钱')
    },
    //切换商品选中状态
    switchGoods(id, checked) {
      switchGoodsChecked({ productIds: id, isChecked: +checked });
    },
    onClickEditAddress() {
      this.show = !this.show;
      this.tip = this.show ? "完成编辑" : "编辑";
      this.color = this.show ? "danger" : "info";
    },
  },
};
</script>
<style lang="scss" scoped>
.cart {
  .head {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 28px;
  }
  .goods {
    li {
      background: #fff;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
      padding: 0 18px 10px;
      .van-card {
        flex: 1;
        margin-left: 10px;
      }
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
  .van-submit-bar__tip {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      margin-left: 10px;
    }
  }
}
</style>
