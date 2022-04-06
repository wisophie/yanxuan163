<template>
  <div class="brand">
    <header>
      <img :src="brand.list_pic_url" alt="">
      <u>{{brand.name}}</u>
    </header>
    <footer>
      {{brand.simple_desc}}
    </footer>
  </div>
</template>

<script>
import {getBrandDetail} from '@/network/api'
export default {
  data () {
    return {
      brand:{}
    }
  },
  async created(){
    let id=this.$route.params.id
    let {data:{brand}} = await getBrandDetail(id)
    this.brand=brand
  }
}
</script>
 
<style lang = "scss" scoped>
header{
  position: relative;
  img{
    width: 100%;
    display: block;
  }
  u{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    font-size: 20px;
  }
}
footer{
      font-size: 18px;
    padding: 20px 2%;
    background: #fff;
    color: #666;
    text-align: center;
}
</style>