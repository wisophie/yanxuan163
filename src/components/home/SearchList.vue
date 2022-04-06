<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled />
      <van-dropdown-item
        title="价格"
        @change="priceSort"
        v-model="order"
        :options="option1"
      />
      <van-dropdown-item
        title="分类"
        @change="cateChange"
        v-model="cateId"
        :options="option2"
      />
    </van-dropdown-menu>
    <shop-list :data="data" />
  </div>
</template>

<script>
import ShopList from "@/components/common/ShopList";
export default {
  components: { ShopList },
  props: ["queryData"],
  data() {
    return {
      order: "",
      cateId: 0,
      option1: [
        { text: "价格由高到低", value: 'desc' },
        { text: "价格由低到高", value: 'asc' },
      ],
      option2: [],
      data: [],
    };
  },
  created() {
    let div=document.querySelectorAll('.newShop')
    document.querySelector('.special').style.display='none'
    document.querySelector('.hotRecommend').style.display='none'
    
    for(let i=0;i<div.length;i++){
      div[i].style.display='none'
    }
    this.option2 = this.queryData.filterCategory.map(({ name, id }) => ({
      text: name,
      value: id,
    }));
    this.data = this.queryData.data;
  },
  watch: {
    queryData(newVal){
      this.data = newVal.data;
    }
  },
  methods: {
    priceSort() {
      // this.data =
      //   this.value1 == 1
      //     ? this.data.sort((n1, n2) => n1.retail_price - n2.retail_price)
      //     : this.data.sort((n1, n2) => n2.retail_price - n1.retail_price);
      this.$emit("updateDate", {id:this.cateId,order:this.order,sort:'price'});
    },
    cateChange() {
      console.log(!this.order)
      !this.order?this.$emit("updateDate", {id:this.cateId}):this.$emit("updateDate", {id:this.cateId,order:this.order,sort:'price'})
      
    },
  },
};
</script>

<style lang="scss" scoped></style>
