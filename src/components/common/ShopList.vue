<template>
  <div class="newShop">
    <div class="head">{{title}}</div>
    <ul>
      <li v-for="item in data" :key="item.id" @click="shopClick(item.id)">
        <img :src="item.list_pic_url" alt="" v-lazy='item.list_pic_url'/>
        <div class="name">{{ item.name }}</div>
        <div class="price">{{ item.retail_price | money }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{data:Array,title:String},
  data() {
    return {};
  },
  methods:{
    shopClick(id){
      this.$router.push('/shopdetail/'+id)
      // setTimeout(()=>this.$router.go(0),10)
    }
  }
};
</script>

<style lang="scss" scoped>
.newShop {
  margin-top: 20px;
  .head {
    text-align: center;
    line-height: 50px;
    font-size: 16px;
  }
    background: #efefef;
    ul {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      flex-wrap: wrap;
      text-align: center;
      li {
        padding-bottom: 10px;
        width: 48%;
        background: #fff;
        margin-bottom: 10px;
        img {
          width: 100%;
        }
        .price {
          color: darkred;
          margin-top: 12px;
        }
      }
    }
  }</style>
