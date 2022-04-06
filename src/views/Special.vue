<template>
  <div class="topic">
    <ul class="content">
      <li v-for="item in data" :key="item.id">
        <img :src="item.scene_pic_url" alt="">
        <div class="nowrap msg">{{item.subtitle}}</div>
        <div>{{item.title}}</div>
        <div class="money">{{item.price_info | money}}</div>
      </li>
    </ul>
    <!-- 分页 -->
<van-pagination @change="pageToggle" v-model="currentPage" :page-count="totalPages" mode="simple" />
  </div>
</template>

<script>
import {getTopic} from '@/network/api'
export default {
  data () {
    return {
      currentPage:1,
      data:[],
      totalPages:1
    }
  },
  created(){
    this._getTopic()
  },
  methods:{
    async _getTopic(){
      let {data:{data,totalPages}}=await getTopic(this.currentPage)
      this.totalPages=totalPages
      this.data=data
    },
    pageToggle(){
      this._getTopic()
    }
  }
}
</script>
 
<style lang='scss' scoped>
.topic{
  padding-bottom: 50px;
  .content{
    background: #efefef;
    li{
      background: #fff;
      margin-bottom: 15px;
      img{
        width: 100%;
      }
      div{
        height: 40px;
        line-height: 40px;
        text-align: center;
        &.msg{
          padding: 0 20px;
        }
        &.money{
          color: darkred;
        }
      }
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
}
</style>
