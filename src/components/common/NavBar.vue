<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="主页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    }
  },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {
      this.$router.push('/')
    },
  },
};
</script>

<style lang="scss" scoped></style>
