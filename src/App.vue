<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  components:{
  }
}
</script>

<style lang="scss">
@import 'http://at.alicdn.com/t/font_2203654_b9kefj7swec.css';
@import './assets/global-style.scss';
#app{
  min-height: 100vh;
  background-color:$background-color;
  font-size: 14px;
}
.nowrap{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
