<template>
  <div class="title">
    <span></span>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props:['title'],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.title {
  background: #fff;
  height: 50px;
  position: relative;
  text-align: center;
  h2,
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h2 {
    z-index: 99;
    background: #fff;
    width: 100px;
    font-size: 18px;
  }
  span {
    width: 50%;
    height: 2px;
    background: #ccc;
  }
}
</style>
