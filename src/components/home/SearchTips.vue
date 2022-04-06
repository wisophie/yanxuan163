<template>
  <div>
    <van-list :finished="finished" finished-text="没有更多了">
      <van-cell @click="listClick(item)" v-for="item in tips" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  props: ["tips",'searchVal'],
  data() {
    return {
      list: [],
      finished: false,
    };
  },
  methods:{
    listClick(val){
      this.$emit('queryClick',val)
    }
  }
};
</script>

<style lang="scss" scoped></style>
